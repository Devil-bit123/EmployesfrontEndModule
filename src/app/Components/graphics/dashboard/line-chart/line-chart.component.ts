import { EmployesInterface } from '../../../../Interfaces/Employes/employes-interface';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { EmployeBSService } from '../../../../Services/BehaviorSubjects/employe-bs.service';

import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit, AfterViewInit, OnDestroy {

  employees: EmployesInterface[] = [];
  private chart: echarts.ECharts | null = null;

  constructor(private employeBSService: EmployeBSService) {}


  ngOnInit() {
    this.employeBSService.employeBS.subscribe((employees: EmployesInterface[]) => {
      this.employees = employees;
      //console.log('employes desde bars graphic', this.employees);
      this.updateChart(); // Asegúrate de actualizar el gráfico cuando cambien los empleados
    });
  }

  ngAfterViewInit(): void {

    const chartDom = document.getElementById('line-chart') as HTMLDivElement | null;
    if (chartDom) {
      this.chart = echarts.init(chartDom);
      this.updateChart();
    } else {
      console.error('Element with id "main" not found.');
    }

  }

  ngOnDestroy(): void {

    if (this.chart) {
      this.chart.dispose(); // Limpia la instancia del gráfico al destruir el componente
    }

  }

  private updateChart(): void {
    if (this.chart) {
      if (this.employees.length === 0) {
        this.chart.setOption(this.getEmptyChartData());
      } else {
        this.chart.clear();
        this.chart.setOption(this.getChartData());
      }
    }
  }

  private getChartData(): EChartsOption { // Corrige el tipo aquí también
    const employeeNames = this.employees.map(employee => employee.contractDate + ' ');
    const employeePays = this.employees.map(employee => employee.pay);

    const option: EChartsOption = {
      title:{
        text:"Employes Line Chart"
      },
      grid:{
        bottom:120,
        left:80,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: employeeNames,
        axisLabel:{
          rotate:90
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: employeePays,
          type: 'line'
        }
      ]
    };

    return option;
  }



  private getEmptyChartData(): EChartsOption {
    const option: EChartsOption = {
      title: {
        text: 'No data available set filter first',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'bar'
        }
      ]
    };

    return option;
  }


}
