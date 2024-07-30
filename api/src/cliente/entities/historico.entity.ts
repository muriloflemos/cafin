export interface HistoricoPontos {
  data: Date;
  pontos: number;
}

export interface Historico {
  nome: string;
  pontos: HistoricoPontos[];
}
