import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-contato-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.scss']
})

export class ContatoFormComponent implements OnInit {
  contatoForm: FormGroup;
  isEditing = false;
  contatoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ){
    this.contatoForm = this.fb.group({
      contatoNome: ['', [Validators.required]],
      contatoEmail: [''],
      contatoCelular: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(11)
        ]
      ],
      contatoTelefone: [
        '',
        [
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(10)
        ]
      ],
      contatoSnFavorito: ['N'],
      contatoSnAtivo: ['S']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.contatoId = +id;
        this.loadContato(+id);
      }
    });
  }

  goBack(): void {
    this.location.back(); 
  }

  loadContato(id: number): void {
    this.contatoService.getContatoById(id).subscribe(contato => {
      this.contatoForm.patchValue(contato);
    });
  }

  onSubmit(): void {
    if (this.contatoForm.valid) {
      const celular = this.contatoForm.value.contatoCelular;
  
      this.contatoService.checkContactExists(celular).subscribe({
        next: (existingContact) => {
          if (existingContact) {
            alert('Já existe um contato com este número de celular.');
          } else {
            this.saveContact();
          }
        },
        error: (error) => {
          console.error('Ocorreu um problema ao verificar se o contato existe.', error);
        }
      });
    }
  }
  
  saveContact(): void {
    const operation = this.isEditing
      ? this.contatoService.updateContato(this.contatoId!, this.contatoForm.value)
      : this.contatoService.createContato(this.contatoForm.value);
  
    operation.subscribe({
      next: () => this.router.navigate(['/contatos']),
      error: error => console.error('Houve um problema.', error)
    });
  }

  inactivateContato(): void {
    if (this.contatoId) {
      this.contatoService.inactivateContato(this.contatoId).subscribe({
        next: () => this.router.navigate(['/contatos']),
        error: error => console.error('Houve um problema.', error)
      });
    }
  }
}
