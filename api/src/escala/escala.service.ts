import { Injectable, Logger } from '@nestjs/common';
import { DBService } from '../db.service';
import { Escala } from '@prisma/client';

@Injectable()
export class EscalaService {
  private readonly logger = new Logger(EscalaService.name);

  constructor(private readonly db: DBService) {}

  async findAll(): Promise<Escala[]> {
    return await this.db.escala.findMany({
      include: {
        grupos: {
          include: {
            items: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
