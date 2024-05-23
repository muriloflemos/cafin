export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface Usuario {
  id: number;
  email: string;
  nome: string;
  username: string;
  senha?: string;
  roles: Role[],
}
