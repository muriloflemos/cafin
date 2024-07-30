export interface Cliente {
  id: number;
  nome?: string;
  telefone?: string;
  endereco?: string;
  estadoCivil?: string;
  filhos?: number;
  email?: string;
  dataNascimento?: Date;
  cpf?: string;
  rg?: string;
  diagnosticoClinico?: string;
  diagnosticoFisioterapeutico?: string;
}

export interface SaveClienteDTO {
  nome?: string | null;
  telefone?: string | null;
  endereco?: string | null;
  estadoCivil?: string | null;
  filhos?: number | null;
  email?: string | null;
  dataNascimento?: string | null;
  cpf?: string | null;
  rg?: string | null;
  diagnosticoClinico?: string | null;
  diagnosticoFisioterapeutico?: string | null;
}

export interface FindClienteDto {
  nome?: string;
  email?: string;
  cpf?: string | null;
  rg?: string | null;
  dataNascimentoStart?: Date | null;
  dataNascimentoEnd?: Date | null;
  skip?: number;
  take?: number;
}

export interface HistoricoPontos {
  data: Date;
  pontos: number;
}

export interface Historico {
  nome: string;
  pontos: HistoricoPontos[];
}
