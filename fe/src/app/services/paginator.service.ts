import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PaginatorService {
  changes = new Subject<void>();
  firstPageLabel = 'Primeira';
  itemsPerPageLabel = 'Itens por página: ';
  lastPageLabel = 'Última';
  nextPageLabel = 'Próxima';
  previousPageLabel = 'Anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Página 1 de 1';
    }

    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}
