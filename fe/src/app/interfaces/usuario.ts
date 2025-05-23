export enum Role {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
  AVALIACAO = 'AVALIACAO',
  EVOLUCAO = 'EVOLUCAO',
  NOTIFICACAO = 'NOTIFICACAO',
}

export interface UsuarioRole {
  role: Role;
}

export interface Usuario {
  id: number;
  email: string;
  nome: string;
  senha?: string;
  roles: UsuarioRole[],
}

export interface SaveUsuarioDTO {
  email?: string | null;
  nome?: string | null;
  senha?: string | null;
  roles?: Role[] | string[] | null;
}

export interface FindUsuarioDto {
  email?: string;
  nome?: string;
  skip?: number;
  take?: number;
}
