import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { EmployesInterface } from '../../../../Interfaces/Employes/employes-interface';
import { EmployeBSService } from '../../../../Services/BehaviorSubjects/employe-bs.service';

import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  employees: EmployesInterface[] = [];
  private chart: echarts.ECharts | null = null;

  /**
   *
   */
  constructor(private employeBSService: EmployeBSService) {}

  ngOnInit() {
    this.employeBSService.employeBS.subscribe(
      (employees: EmployesInterface[]) => {
        this.employees = employees;
        //console.log('employes desde bars graphic', this.employees);
        this.updateChart(); // Asegúrate de actualizar el gráfico cuando cambien los empleados
      }
    );
  }

  ngAfterViewInit(): void {
    const chartDom = document.getElementById('pie-chart') as HTMLDivElement | null;
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

  // private getChartData(): EChartsOption {

  //   const employeeNames = this.employees.map(
  //     (employee) => employee.name + ' ' + employee.lastName
  //   );
  //   const employeeDepts = this.employees.map((employee) => employee.nameDept);

  //   const option: EChartsOption = {
  //     tooltip: {
  //       trigger: 'item'
  //     },
  //     legend: {
  //       orient: 'vertical',
  //       left: 'left'
  //     },
  //     series: [
  //       {
  //         name: 'Access From',
  //         type: 'pie',
  //         radius: '50%',
  //         data: [
  //           { value: 1048, name: 'Search Engine' },
  //           { value: 735, name: 'Direct' },
  //           { value: 580, name: 'Email' },
  //           { value: 484, name: 'Union Ads' },
  //           { value: 300, name: 'Video Ads' }
  //         ],
  //         emphasis: {
  //           itemStyle: {
  //             shadowBlur: 10,
  //             shadowOffsetX: 0,
  //             shadowColor: 'rgba(0, 0, 0, 0.5)'
  //           }
  //         }
  //       }
  //     ]
  //   };

  //   return option;
  // }

  private getChartData(): EChartsOption {
    const employeeDeptData = this.groupEmployeesByDepartment();

    const option: EChartsOption = {
      title:{
        text:"Employes pie chart",
        top: 20,
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          name: 'Employees by Department',
          type: 'pie',
          radius: '50%',
          data: employeeDeptData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    return option;
  }



  private groupEmployeesByDepartment(): { name: string, value: number }[] {
    const departmentCount = this.employees.reduce((acc, employee) => {
      const dept = employee.nameDept || 'Unknown';
      if (!acc[dept]) {
        acc[dept] = 0;
      }
      acc[dept]++;
      return acc;
    }, {} as { [key: string]: number });

    return Object.keys(departmentCount).map(dept => ({
      name: dept,
      value: departmentCount[dept]
    }));
  }



  private getEmptyChartData(): EChartsOption {
    const option: EChartsOption = {
      title: {
        text: 'No data available set filter first',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [],
          type: 'bar',
        },
      ],
    };

    return option;
  }

}
