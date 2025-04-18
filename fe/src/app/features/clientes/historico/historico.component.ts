import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import * as Highcharts from 'highcharts';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Historico, HistoricoPontos } from '../../../interfaces/cliente';
import { formatDate, stringToDate } from '../../../utils/date';
import { Avaliacao } from 'src/app/interfaces/avaliacao';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;

  chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'line',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      line: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
        },
      },
    },
    yAxis: {
      title: {
        text: 'Pontos',
      },
    },
    xAxis: {
      title: {
        text: 'Data'
      }
    },
    series: [
      {
        name: '',
        data: [],
      },
    ],
  };

  private chartSub = new BehaviorSubject<Historico[] | null>(null);
  charts$: Observable<any[]> = this.chartSub.asObservable()
    .pipe(map((charts) => {
      const results = [];
      if (charts) {
        for (const chart of charts) {
          results.push({
            ...this.chartOptions,
            title: {
              text: chart.nome,
            },
            xAxis: {
              categories: chart.pontos.map((value) => formatDate(value.data)),
              title: {
                text: 'Data',
              },
            },
            series: [
              {
                name: '',
                data: chart.pontos.map((value) => ({
                  name: formatDate(value.data),
                  y: value.pontos,
                })),
              },
            ],
          });
        }
      }
      return results;
    }));

  onDestroy$ = new Subject();

  displayedColumns: string[] = [
    'data',
    'observacao',
  ];
  datasource: Avaliacao[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly clienteService: ClienteService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const clienteId = Number(params['id']);
      this.load(clienteId);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  load(clienteId: number): void {
    this.clienteService.historico(clienteId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: { historico: Historico[], avaliacoes: Avaliacao[] }) => {
        this.chartSub.next(data.historico);
        this.datasource = data.avaliacoes;
      });
  }

  voltar(): void {
    this.router.navigate(['clientes']);
  }
}
