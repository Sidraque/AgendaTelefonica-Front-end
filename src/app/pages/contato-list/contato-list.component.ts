// contato-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from '../../models/contato.model';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-contato-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contato-list.component.html',
  styleUrls: ['./contato-list.component.scss']
})
export class ContatoListComponent implements OnInit {
  contatos: Contato[] = [];
  originalContatos: Contato[] = [];

  constructor(
    private contatoService: ContatoService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadContatos();
  }

  loadContatos(): void {
    this.contatoService.getContatos().subscribe(
      data => {
        this.contatos = data;
        this.originalContatos = [...this.contatos];
      },
      error => {
        console.error('Erro ao buscar contatos!', error);
      }
    );
  }

  deleteContato(contatoId: number): void {
    if (confirm('Tem certeza de que deseja excluir este contato?')) {
      this.contatoService.deleteContato(contatoId).subscribe(
        () => {
          this.contatos = this.contatos.filter(contato => contato.contatoId !== contatoId);
        },
        error => {
          console.error('Erro ao excluir contato!', error);
        }
      );
    }
  }

  editContato(contato: Contato): void {
    this.router.navigate(['/contato/editar', contato.contatoId]);
  }

  inactivateContato(contato: Contato): void {
    if (confirm('Tem certeza de que deseja desativar este contato?')) {
      this.contatoService.inactivateContato(contato.contatoId).subscribe({
        next: () => {
          contato.contatoSnAtivo = 'N';
        },
        error: error => console.error('Houve um problema.', error)
      });
    }
  }

  addContato(): void {
    this.router.navigate(['/contato/novo']);
  }

  toggleFavorite(contato: Contato): void {
    const isFavorite = contato.contatoSnFavorito === 'S';
    this.contatoService.updateFavorito(contato.contatoId, !isFavorite).subscribe(
      updatedContato => {
        contato.contatoSnFavorito = updatedContato.contatoSnFavorito;
        // Reordenamento após atualizar o estado
        this.reorderContatos();
      },
      error => {
        console.error('Erro ao atualizar o status de favorito!.', error);
      }
    );
  }
  
  
  reorderContatos(): void {
    let favorited = this.contatos.filter(c => c.contatoSnFavorito === 'S').sort((a, b) => this.originalContatos.indexOf(a) - this.originalContatos.indexOf(b));
    let notFavorited = this.originalContatos.filter(c => c.contatoSnFavorito === 'N');
  
    this.contatos = [...favorited, ...notFavorited];
  }
  
  
  
  toggleActive(contato: Contato): void {
    const isActive = contato.contatoSnAtivo === 'S';
    this.contatoService.toggleActiveContato(contato.contatoId, !isActive).subscribe({
      next: updatedContato => {
        contato.contatoSnAtivo = updatedContato.contatoSnAtivo;
      },
      error: error => console.error('Erro ao alternar o status ativo!', error)
    });
  }
}
