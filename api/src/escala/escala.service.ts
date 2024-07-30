import { Injectable, Logger } from '@nestjs/common';
import { DBService } from '../db.service';

@Injectable()
export class EscalaService {
  private readonly logger = new Logger(EscalaService.name);

  constructor(private readonly db: DBService) {}

  async findAll() {
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
