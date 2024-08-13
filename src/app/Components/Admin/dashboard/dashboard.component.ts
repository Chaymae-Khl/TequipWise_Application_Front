import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { EquipementRequestServiceService } from '../../../Services/equipement-request-service.service';

interface MonthlyExpenditureDto {
  day:any;
  year: number;
  month: number;
  total: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Corrected styleUrls
})
export class DashboardComponent implements OnInit {
  numberofusers: number = 0;
  numberofReq: number = 0;
  data: any;
  options: any;
  data2: any;
  options2: any;
  showChart: boolean = true;

  date?: Date;

  constructor(private authService: AuthServiceService, private equipementReqService: EquipementRequestServiceService) {}

  ngOnInit(): void {
    this.getNumofUsers();
    this.getNumOfRequest();
    this.initializeChartData();

    this.date = new Date();
    this.date = new Date();
    const currentYear = this.date.getFullYear();
    const currentMonth = this.date.getMonth() + 1; // Months are 0-indexed in JavaScript
    const currentDay = this.date.getDate();

    this.fetchFilteredSubEquipmentRequests(currentYear, currentMonth, currentDay);

    this.setupChartOptions();
  }

  value = [
    { label: 'Users', color1: '#34d399', color2: '#fbbf24', value: 50, data: this.numberofusers, icon: 'pi pi-users' },
    { label: 'IT Asset Requests', color1: '#fbbf24', color2: '#60a5fa', value: 25, data: this.numberofReq, icon: 'pi pi-inbox' },
    { label: 'Phone Requests', color1: '#60a5fa', color2: '#c084fc', value: 25, data: 0, icon: 'pi pi-inbox' }
  ];

  getNumofUsers() {
    this.authService.getNumUsers().subscribe(
      (data: any) => {
        console.log('Number of users:', data); // Debugging line
        this.numberofusers = data;
        this.updateValueArray();
      },
      (error) => {
        console.error('An error occurred while fetching number of users:', error);
      }
    );
  }

  getNumOfRequest() {
    this.equipementReqService.NumberOfRequest().subscribe(
      (data: any) => {
        console.log('Number of requests:', data); // Debugging line
        this.numberofReq = data;
        this.updateValueArray();
      },
      (error) => {
        console.error('An error occurred while fetching number of requests:', error);
      }
    );
  }

  updateValueArray() {
    this.value[0].data = this.numberofusers;
    this.value[1].data = this.numberofReq;
  }

  onDateChange(event: any) {
    if (event) {
        const year = event.getFullYear();
        const month = event.getMonth() + 1; // JavaScript months are 0-indexed
        const day = event.getDate();
        this.fetchFilteredSubEquipmentRequests(year, month, day);  // Pass year, month, and day
    }
  }

  fetchFilteredSubEquipmentRequests(year: number, month?: number, day?: number) {
    this.equipementReqService.MonthlyExpenditure(year, month, day).subscribe((data: any) => {
      console.log('Filtered daily expenditure data:', data);
      if (data.length === 0) {
        this.data2 = null; // Clear the chart data if no data is returned
      } else {
        this.updateChart(data); // Update the chart with new data
      }
    });
  }
  updateChart(data: MonthlyExpenditureDto[]) {
    const dailyData = data.map(d => `${d.day}/${d.month}/${d.year}`);
    const values = data.map(d => d.total);

    this.data2 = {
      labels: dailyData,
      datasets: [
        {
          label: 'Daily Expenditure',
          backgroundColor: '#2E4957',
          data: values
        }
      ]
    };
  }
  aggregateMonthlyData(data: MonthlyExpenditureDto[]) {
    const monthlyData: { [key: string]: number } = {};

    data.forEach(item => {
      const month = `${item.month}/${item.year}`;
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month] += item.total;
    });

    return monthlyData;
  }

  initializeChartData() {
    this.equipementReqService.getRequestCounts().subscribe(counts => {
      console.log('Request counts:', counts); // Debugging line
      this.data = {
        labels: ['Open', 'In Progress', 'Waiting For Finance', 'Waiting for PR', 'Waiting for PO', 'Approved', 'Rejected'],
        datasets: [
          {
            label: 'IT Assets Request',
            backgroundColor: [
            
            '#e9844070', // Blue
            '#E98300', // Orange
            '#A4D4E6', // Red
            '#167A87', // Teal
            '#2E4957', // Pink
            '#8FB838', // Purple
            'red'  // Yellow
            ],
            borderColor: [
             '#e9844070', // Blue
            '#E98300', // Orange
            '#A4D4E6', // Red
            '#167A87', // Teal
            '#2E4957', // red
            '#8FB838', // Purple
            'red'  // Yellow
            ],
            data: [
              counts.open,
              counts.inProgress,
              counts.waitingForFinanceApproval,
              counts.waitingForPR,
              counts.waitingForPO,
              counts.approved,
              counts.rejected
            ]
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {}
        },
        scales: {
          x: {
            ticks: {
              color: '#495057',
              font: {
                weight: 500
              }
            },
            grid: {
              color: '#ebedef',
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef',
              drawBorder: false
            }
          }
        }
      };
      this.data = {
        labels: ['Open', 'In Progress', 'Waiting For Finance', 'Waiting for PR', 'Waiting for PO', 'Approved', 'Rejected'],
        datasets: [
          {
            label: 'IT Assets Request',
            backgroundColor: [
            
            '#e9844070', // Blue
            '#E98300', // Orange
            '#A4D4E6', // Red
            '#167A87', // Teal
            '#2E4957', // Pink
            '#8FB838', // Purple
            'red'  // Yellow
            ],
            borderColor: [
             '#e9844070', // Blue
            '#E98300', // Orange
            '#A4D4E6', // Red
            '#167A87', // Teal
            '#2E4957', // red
            '#8FB838', // Purple
            'red'  // Yellow
            ],
            data: [
              counts.open,
              counts.inProgress,
              counts.waitingForFinanceApproval,
              counts.waitingForPR,
              counts.waitingForPO,
              counts.approved,
              counts.rejected
            ]
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {}
        },
        scales: {
          x: {
            ticks: {
              color: '#495057',
              font: {
                weight: 500
              }
            },
            grid: {
              color: '#ebedef',
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef',
              drawBorder: false
            }
          }
        }
      };
    });
    
  }

  setupChartOptions() {
    this.options2 = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#333',
          },
        },
        tooltip: {
          backgroundColor: '#333',
          titleColor: '#fff',
          bodyColor: '#fff',
        },
      },
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Day',
            color: '#555'
          },
          ticks: {
            color: '#666'
          },
          grid: {
            color: '#ddd',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Total Expenditure',
            color: '#EA8300'
          },
          ticks: {
            color: '#EA8300'
          },
          grid: {
            color: '#EA8300',
          },
        },
      }
    };
  }
}
