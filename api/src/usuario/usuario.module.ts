import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { DBService } from '../db.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, DBService],
})
export class UsuarioModule {}
