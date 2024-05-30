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

export interface CreateUsuarioDTO {
  email: string;
  nome: string;
  username: string;
  senha: string;
  roles: Role[];
}

export interface FindUsuarioDto {
  email?: string;
  nome?: string;
  username?: string;
  skip?: number;
  take?: number;
}
