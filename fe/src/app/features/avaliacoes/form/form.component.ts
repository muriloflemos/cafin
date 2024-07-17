import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { parse, format } from 'date-fns';
import { BehaviorSubject, Observable, Subject, debounceTime, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AvaliacaoService } from '../../../services/avaliacao.service';
import { EscalaService } from '../../../services/escala.service';
import { ClienteService } from '../../../services/cliente.service';
import { AlertService } from '../../../services/alert/alert.service';
import { Avaliacao, AvaliacaoItem, CreateAvaliacaoDto, CreateAvaliacaoItemDto } from '../../../interfaces/avaliacao';
import { Cliente, FindClienteDto } from '../../../interfaces/cliente';
import { PaginatedDTO } from '../../../interfaces/paginated.dto';
import { Escala, EscalaGrupo, EscalaItem } from '../../../interfaces/escala';

const formatDate = (date: Date) => {
  const noTimeDate = date.toString().slice(0, 10);
  const year = noTimeDate.substring(0, 4);
  const month = noTimeDate.substring(5, 7);
  const day = noTimeDate.substring(8, 10);
  return `${day}/${month}/${year}`;
}

@Component({
  selector: 'app-form-avaliacoes',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormAvaliacoesComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();

  form = this.formBuilder.group({
    data: [format(new Date(), 'dd/MM/yyyy'), Validators.required],
    clienteId: [0, Validators.required],
    cliente: new FormControl<string | Cliente>('', Validators.required),
    items: this.formBuilder.array([]),
    pontos: this.formBuilder.array([]),
    totalPontos: [0],
  });

  view = false;
  private avaliacaoId: number = -1;

  dateMask = 'd0/M0/0000';

  clientes$: Observable<Cliente[]>;

  escalas: Escala[] = [];
  private escalasSub = new BehaviorSubject<Escala[]>([]);
  escalas$: Observable<Escala[]> = this.escalasSub.asObservable()
    .pipe(
      map((escalas: Escala[]) => {
        let groupIndex = -1;
        return escalas.map((escala: Escala) => ({
          ...escala,
          grupos: escala.grupos.map((grupo: EscalaGrupo) => {
            groupIndex++;
            return {
              ...grupo,
              index: groupIndex,
            };
          })
        }));
      }),
      tap((escalas: Escala[]) => {
        this.escalas = escalas;
      }),
    );

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private avaliacaoService: AvaliacaoService,
    private escalaService: EscalaService,
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
    this.loadEscalas();
    this.route.params.subscribe((params) => {
      this.avaliacaoId = Number(params['id']);

      if (this.avaliacaoId > 0) {
        this.view = true;
        this.avaliacaoService
          .findById(this.avaliacaoId)
          .subscribe((avaliacao: Avaliacao) => {
            if (avaliacao) {
              const { data, cliente, pontuacao } = avaliacao;
              this.form.patchValue({
                data: data ? formatDate(data) : null,
                clienteId: cliente.id,
                cliente,
                totalPontos: Number(pontuacao),
              });
              this.loadEscalas().subscribe((escalas: Escala[]) => {
                for (const escala of escalas) {
                  for (const grupo of escala.grupos) {
                    const item = avaliacao.items
                      .find((item: AvaliacaoItem) => item.grupoId === grupo.id);
                    if (item) {
                      this.addFormItem(this.formBuilder.control(item.itemId, Validators.required));
                      this.addFormPontos(this.formBuilder.control(Number(item.pontuacao), Validators.required));
                    }
                  }
                }
              });
            }
          });
      } else {
        this.loadEscalas().subscribe((escalas: Escala[]) => {
          for (const escala of escalas) {
            for (const grupo of escala.grupos) {
              this.addFormItem(this.formBuilder.control(null, Validators.required));
              this.addFormPontos(this.formBuilder.control(null, Validators.required));
            }
          }
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  get formPontos() {
    return this.form.get('pontos') as unknown as FormArray;
  }

  get formItems() {
    return this.form.get('items') as unknown as FormArray;
  }

  getPontos(index: number) {
    return this.formPontos.at(index).value;
  }

  getPontuacao() {
    return this.formPontos.value;
  }

  addFormItem(control: FormControl) {
    this.formItems.push(control);
  }

  addFormPontos(control: FormControl) {
    this.formPontos.push(control);
  }

  loadEscalas(): Observable<Escala[]> {
    return this.escalaService.findAll()
      .pipe(
        takeUntil(this.onDestroy$),
        tap((escalas: Escala[]) => {
          this.escalasSub.next(escalas);
        }),
      );
  }

  displayCliente(cliente: Cliente): string {
    return cliente?.nome ?? '';
  }

  clienteSelected(event: MatAutocompleteSelectedEvent): void {
    const cliente = <Cliente>event.option.value;
    this.form.controls.clienteId.setValue(cliente.id);
  }

  cancelar(): void {
    this.router.navigate(['avaliacoes']);
  }

  salvar(): void {
    if (!this.form.valid) {
      return;
    }

    let { data, clienteId } = this.form.value;

    try {
      if (data) {
        data = parse(data, 'dd/MM/yyyy', new Date()).toISOString();
      }
    } catch (e) {
      this.alertService.showError('Erro', 'Não foi possivel validar a data de nascimento.');
      return;
    }

    if (!data || !clienteId) return;

    let itemsDTO: CreateAvaliacaoItemDto[] = [];
    this.escalas.forEach((escala: Escala) => {
      escala.grupos.forEach((grupo: EscalaGrupo) => {
        const itemId = Number(this.formItems.at(grupo.index).value) ?? 0;
        const pontuacao = Number(this.formPontos.at(grupo.index).value) ?? 0;
        itemsDTO.push({
          grupoId: grupo.id,
          itemId,
          pontuacao,
        });
      });
    });

    const saveData: CreateAvaliacaoDto = {
      data,
      clienteId,
      items: itemsDTO,
    };

    this.avaliacaoService
      .create(saveData)
      .subscribe({
        complete: () => {
          this.router.navigate(['avaliacoes']);
        },
        error: (error) => this.showError(error),
      });
  }

  showError(error: any) {
    const title = 'Ocorreu um erro ao salvar a avaliação';
    if (error.message instanceof Array) {
      this.alertService.showErrors(title, error.message);
    } else {
      this.alertService.showError(title, error.message);
    }
  }

  onChangeItem(item: EscalaItem, grupo: EscalaGrupo): void {
    this.formPontos.at(grupo.index).setValue(item.pontos);
    this.calculaPontuacao();
  }

  calculaPontuacao() {
    let pontuacao = 0;
    for (let value of this.formPontos.value) {
      pontuacao += Number(value);
    }
    this.form.patchValue({
      totalPontos: pontuacao,
    });
  }
}
