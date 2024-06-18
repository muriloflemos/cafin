import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { parse, format } from 'date-fns';
import { EvolucaoService } from '../../../services/evolucao.service';
import { ClienteService } from '../../../services/cliente.service';
import { AlertService } from '../../../services/alert/alert.service';
import { Evolucao, SaveEvolucaoDTO } from '../../../interfaces/evolucao';
import { Cliente, FindClienteDto } from '../../../interfaces/cliente';
import { Observable, debounceTime, filter, map, switchMap } from 'rxjs';
import { PaginatedDTO } from 'src/app/interfaces/paginated.dto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

const formatDate = (date: Date) => {
  const noTimeDate = date.toString().slice(0, 10);
  const year = noTimeDate.substring(0, 4);
  const month = noTimeDate.substring(5, 7);
  const day = noTimeDate.substring(8, 10);
  return `${day}/${month}/${year}`;
}

@Component({
  selector: 'app-form-evolucoes',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormEvolucoesComponent {
  form = this.formBuilder.group({
    data: [format(new Date(), 'dd/MM/yyyy'), Validators.required],
    clienteId: [0, Validators.required],
    cliente: new FormControl<string | Cliente>('', Validators.required),
    descricao: ['', Validators.required],
  });

  editing = false;
  private evolucaoId: number = -1;

  dateMask = 'd0/M0/0000';

  clientes$: Observable<Cliente[]>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private evolucaoService: EvolucaoService,
    private clienteService: ClienteService,
    private alertService: AlertService,
  ) {
    this.clientes$ = this.form.controls.cliente.valueChanges.pipe(
      debounceTime(600),
      filter(value => {
        if (value === null) return false;
        return typeof value === 'string' && value.length >= 3;
      }),
      map(value => typeof value === 'string' ? value : null),
      switchMap((value) => {
        const params: FindClienteDto = {
          nome: value ?? '',
          skip: 0,
          take: 20,
        };
        return this.clienteService.findAll(params);
      }),
      map((response: PaginatedDTO<Cliente>) => response.data)
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.evolucaoId = Number(params['id']);

      if (this.evolucaoId > 0) {
        this.editing = true;
        this.evolucaoService
          .findById(this.evolucaoId)
          .subscribe((evolucao: Evolucao) => {
            if (evolucao) {
              const { data, descricao, cliente } = evolucao;
              this.form.patchValue({
                descricao,
                clienteId: cliente.id,
                cliente,
                data: data ? formatDate(data) : null,
              });
            }
          });
      }
    });
  }

  displayCliente(cliente: Cliente): string {
    return cliente?.nome ?? '';
  }

  clienteSelected(event: MatAutocompleteSelectedEvent): void {
    const cliente = <Cliente>event.option.value;
    this.form.controls.clienteId.setValue(cliente.id);
  }

  cancelar(): void {
    this.router.navigate(['evolucoes']);
  }

  salvar(): void {
    if (!this.form.valid) {
      return;
    }

    let { data } = this.form.value;

    try {
      if (data) {
        data = parse(data, 'dd/MM/yyyy', new Date()).toISOString();
      }
    } catch (e) {
      this.alertService.showError('Erro', 'Não foi possivel validar a data de nascimento.');
      return;
    }

    const { descricao, clienteId } = this.form.value;

    const saveData: SaveEvolucaoDTO = {
      data,
      descricao,
      clienteId,
    };

    if (this.editing) {
      this.evolucaoService
        .update(this.evolucaoId, saveData)
        .subscribe({
          complete: () => {
            this.router.navigate(['evolucoes']);
          },
          error: (error) => this.showError(error),
        });
    } else {
      this.evolucaoService
        .create(saveData)
        .subscribe({
          complete: () => {
            this.router.navigate(['evolucoes']);
          },
          error: (error) => this.showError(error),
        });
    }
  }

  showError(error: any) {
    const title = 'Ocorreu um erro ao salvar a evolução';
    if (error.message instanceof Array) {
      this.alertService.showErrors(title, error.message);
    } else {
      this.alertService.showError(title, error.message);
    }
  }
}
