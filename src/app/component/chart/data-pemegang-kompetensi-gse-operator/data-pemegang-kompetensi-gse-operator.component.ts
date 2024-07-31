import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-data-pemegang-kompetensi-gse-operator',
  standalone: true,
  imports: [],
  templateUrl: './data-pemegang-kompetensi-gse-operator.component.html',
  styleUrl: './data-pemegang-kompetensi-gse-operator.component.css'
})
export class DataPemegangKompetensiGseOperatorComponent implements AfterViewInit {
  @ViewChild('dataPemegangKompetensiGSEOperator') private dataPemegangKompetensiGseOperatorRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    const canvas = this.dataPemegangKompetensiGseOperatorRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['FLT', 'GPS', 'WSS', 'WMT', 'AWT', 'GSE', 'ACS', 'ATT', 'BTT', 'RDS', 'LSS', 'ASS', 'TBL'],
        datasets: [
          {
            label: 'TB',
            data: [19, 23, 55, 35, 34, 12, 11, 45, 26, 12, 44, 12, 34],
            backgroundColor: '#000',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'TC',
            data: [20, 32, 23, 23, 45, 56, 23, 21, 45, 23, 21, 34, 42,],
            backgroundColor: '#6EACDA',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'TF',
            data: [55, 35, 34, 12, 11, 45, 20, 32, 23, 23, 45, 56, 23],
            backgroundColor: '#03346E',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'TJ',
            data: [12, 11, 45, 20, 32, 23, 23, 21, 45, 23, 21, 34, 23],
            backgroundColor: '#114B5F',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'TL',
            data: [32, 23, 23, 20, 32, 23, 23, 21, 45, 21, 45, 23, 11],
            backgroundColor: '#A66CC1',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'TM',
            data: [45, 21, 45, 23, 11, 32, 46, 13, 12, 23, 43, 54, 75],
            backgroundColor: '#C63C51',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'TR',
            data: [46, 13, 12, 23, 43, 54, 75, 11, 45, 20, 32, 44, 32],
            backgroundColor: 'green',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'TU',
            data: [41, 17, 23, 24, 58, 23, 19, 55, 43, 76, 57, 29, 30],
            backgroundColor: 'blue',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'TV',
            data: [20, 10, 19, 42, 32, 23, 10, 29, 72, 12, 38, 39, 44],
            backgroundColor: 'orange',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'TZ',
            data: [19, 42, 32, 23, 10, 29, 72, 58, 23, 19, 55, 43, 76],
            backgroundColor: 'purple',
            stack: 'Stack 0',
            barThickness: 35
          },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 20,
              boxHeight: 20,
              padding: 10,
              color: '#FFFFFF',
              font: {
                family: 'Petrona',
                size: 20,
              }
            }
          },
          datalabels: {
            color: '#FFF',
            font: {
              family: 'Petrona',
              size: 15
            },
            display: function(context) {
              return context.dataset.data[context.dataIndex] !== 0;
            }
          },
          title: {
            display: true,
            text: 'Data Pemegang Kompetensi GSE Operator',
            color: '#FFFFFF',
            font: {
              size: 30,
              family: 'Petrona'
            },
            padding: {
              top: 5,
              bottom: 5
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: '#000',
              font: {
                size: 15,
                family: 'Petrona'
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: '#000',
              font: {
                size: 15,
                family: 'Petrona'
              },
            },
            grid: {
              color: '#000',
              lineWidth: 2
            }
          }
        }
      }
    });
  }
}
