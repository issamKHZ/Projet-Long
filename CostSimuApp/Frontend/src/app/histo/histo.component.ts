import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-histo',
  template: `
    <div>
      <canvas #myChart></canvas>
    </div>
  `,
  styleUrl: './histo.component.scss'
})
export class HistoComponent implements AfterViewInit {
  @ViewChild('myChart') chartCanvas!: ElementRef;

  @Input() dataEks : number[] = [];
  @Input() dataAks : number[] = [];

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx: CanvasRenderingContext2D = this.chartCanvas.nativeElement.getContext('2d');

    Chart.register(...registerables); // Si vous utilisez Chart.js version 3

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Uptime', 'Error Rate', 'Throughput', 'Response Time', 'Latency', 'CPU Utilization', 'memory usage', 'Storage Throughput'],
        datasets: [{
          label: 'EKS',
          data: this.dataEks,
          backgroundColor: '#f1830f', // Couleur de fond pour la première colonne
          borderColor: ' #f4720c', // Couleur de la bordure pour la première colonne
          borderWidth: 1
        }, {
          label: 'AKS',
          data: this.dataAks,
          backgroundColor: '#0c6ff4', // Couleur de fond pour la deuxième colonne
          borderColor: '#0c4bf4', // Couleur de la bordure pour la deuxième colonne
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
