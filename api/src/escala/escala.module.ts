import { Module } from '@nestjs/common';
import { EscalaService } from './escala.service';
import { EscalaController } from './escala.controller';
import { DBService } from '../db.service';

@Module({
  controllers: [EscalaController],
  providers: [EscalaService, DBService],
  exports: [EscalaService],
})
export class EscalaModule {}
