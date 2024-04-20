// contato.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../models/contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:8080/api/contatos';

  constructor(private http: HttpClient) { }

  getContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  getContatoById(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/${id}`);
  }

  createContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  updateContato(id: number, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${id}`, contato);
  }

  deleteContato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateFavorito(id: number, isFavorite: boolean): Observable<Contato> {
    return this.http.patch<Contato>(`${this.apiUrl}/${id}/favorito`, { favorito: isFavorite });
  }

  toggleActiveContato(contatoId: number, isActive: boolean): Observable<Contato> {
    return this.http.patch<Contato>(`${this.apiUrl}/${contatoId}/ativo`, { ativo: isActive });
  }

  inactivateContato(contatoId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${contatoId}/ativo`, { ativo: false });
  }

  checkContactExists(celular: string): Observable<Contato | null> {
    return this.http.get<Contato | null>(`${this.apiUrl}/exists/${celular}`);
  }
}
