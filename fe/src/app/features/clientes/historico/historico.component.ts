import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import * as Highcharts from 'highcharts';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Historico } from '../../../interfaces/cliente';
import { formatDate, stringToDate } from '../../../utils/date';

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
              }
            ],
          });
        }
      }
      return results;
    }));

  onDestroy$ = new Subject();

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
      .subscribe((data: Historico[]) => {
        this.chartSub.next(data);
      });
  }

  voltar(): void {
    this.router.navigate(['clientes']);
  }
}
