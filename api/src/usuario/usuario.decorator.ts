import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { Role } from '../enums/role.enum';

export interface UsuarioWithRoles extends Usuario {
  roles: { role: Role }[];
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return <UsuarioWithRoles>request.user;
  },
);
