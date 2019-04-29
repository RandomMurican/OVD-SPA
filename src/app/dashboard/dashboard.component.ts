import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usedFreeLabel = ['Used', 'Free'];
  chartOptions = {
    responsive: true,
    aspectRatio: 5
  };
  diskChartOptions = {
    responsive: true,
    borderAlign: 'inner'
  };

  // List of data and the corresponding labels for the chart
  chartData = [
    { data: [0.15, 0.15, 0.13, 0.14, 0.12, 0.12, 0.11, 0.13, 0.12, 0.10, 0.09, 0.11, 0.11], label: 'Swarm 1' }
  ];
  totalCPU = 64;
  usedCPU = 16;
  totalRam = 128;
  usedRam = 64;
  totalData = 8000;
  usedData = 128;

  loadCpuData = [{ data: [Math.round(0.64 * this.usedCPU), this.usedCPU] }];
  loadRamData = [{ data: [Math.round(0.23 * this.usedRam), this.usedRam] }];
  loadDataData = [{ data: [Math.round(0.67 * this.usedData), this.usedData] }];

  serverCpuData = [{ data: [this.usedCPU, this.totalCPU - this.usedCPU] }];
  serverRamData = [{ data: [this.usedRam, this.totalRam - this.usedRam] }];
  serverDataData = [{ data: [this.usedData, this.totalData - this.usedData] }];

  // List of x-axis labels for the chart
  chartLabels = ['7:10', '', '', '7:15', '', '', '7:20', '', '', '7:25', '', '', '7:30'];

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() { }

  newDataPoint(dataArr, label) {

    this.chartData.forEach((dataset, index) => {
      this.chartData[index] = Object.assign({}, this.chartData[index], {
        data: [...this.chartData[index].data, dataArr[index]]
      });
    });
    this.chartLabels = [...this.chartLabels, label];

  }
}
