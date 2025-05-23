import { Cliente } from './cliente';

export interface AvaliacaoItem {
  id: number;
  avaliacaoId: number;
  grupoId: number;
  itemId: number;
  pontuacao: number;
}

export interface Avaliacao {
  id: number;
  data: Date;
  clienteId: number;
  cliente: Cliente;
  observacao: string;
  items: AvaliacaoItem[];
}

export interface CreateAvaliacaoItemDto {
  grupoId: number;
  itemId: number;
  pontuacao: number;
}

export interface CreateAvaliacaoDto {
  data: string;
  clienteId: number;
  observacao: string;
  items: CreateAvaliacaoItemDto[];
}

export interface FindAvaliacaoDto {
  startDate?: string | null;
  endDate?: string | null;
  cliente?: string | null;
  skip?: number;
  take?: number;
}
