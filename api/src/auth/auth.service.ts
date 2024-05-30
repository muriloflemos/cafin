import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { PasswordHelper } from '../helpers/password/password';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, senha: string): Promise<any> {
    const usuario = await this.usuarioService.findByUsername(username);
    if (await PasswordHelper.compare(senha, usuario.senha)) {
      delete usuario.senha;
      const payload = {
        sub: usuario.id,
        usuario: {
          ...usuario,
          roles: usuario.roles.map((userRole) => userRole.role),
        },
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
