import { Cliente } from './cliente';

export interface Evolucao {
  id: number;
  data: Date;
  descricao: string;
  clienteId: number;
  cliente: Cliente;
}

export interface SaveEvolucaoDTO {
  data?: string | null;
  descricao?: string | null;
  clienteId?: number | null;
}

export interface FindEvolucaoDto {
  startDate?: string | null;
  endDate?: string | null;
  cliente?: string | null;
  skip?: number;
  take?: number;
}
