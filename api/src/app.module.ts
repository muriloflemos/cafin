import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { EvolucaoModule } from './evolucao/evolucao.module';
import { NotificacaoModule } from './notificacao/notificacao.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { EscalaModule } from './escala/escala.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve('dist/fe/cafin'),
      exclude: ['/api*'],
    }),
    UsuarioModule,
    AuthModule,
    ClienteModule,
    EvolucaoModule,
    NotificacaoModule,
    AvaliacaoModule,
    EscalaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
