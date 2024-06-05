import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { DBService } from '../db.service';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, DBService],
  exports: [ClienteService],
})
export class ClienteModule {}
