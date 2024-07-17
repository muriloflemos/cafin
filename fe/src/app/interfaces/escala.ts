export interface EscalaItem {
  id: number;
  descricao: string;
  pontos: number;
  grupoId: number;
}

export interface EscalaGrupo {
  id: number;
  descricao: string;
  instrucao: string;
  escalaId: number;
  index: number;
  items: EscalaItem[];
}

export interface Escala {
  id: number;
  descricao: string;
  grupos: EscalaGrupo[];
}
