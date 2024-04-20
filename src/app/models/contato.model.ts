// contato.model.ts
export interface Contato {
    contatoId: number;
    contatoNome: string;
    contatoEmail?: string;
    contatoCelular: string;
    contatoTelefone?: string;
    contatoSnFavorito: 'S' | 'N';
    contatoSnAtivo: 'S' | 'N';
    contatoDhCad?: Date;
  }
  