import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { EquipementRequestServiceService } from '../../../Services/equipement-request-service.service';
import { PhoneRequestServiceService } from '../../../Services/phone-request-service.service';
import { MaintenanceServiceService } from '../../../Services/maintenance-service.service';

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
  numberofPhoneReq: number = 0;
  numberofMainReq: number = 0;
  data: any;
  phonedata:any;
  Maintedata:any;
  options: any;
  data2: any;
  options2: any;
  showChart: boolean = true;
  startDate?: Date;
  endDate?: Date;
  date?: Date;

  constructor(private authService: AuthServiceService, 
    private equipementReqService: EquipementRequestServiceService, 
    private phoneReqService: PhoneRequestServiceService,
    private maintenanceServiceService :MaintenanceServiceService
  ) {}

  ngOnInit(): void {
    this.getNumofUsers();
    this.getNumOfRequest();
    this.initializeChartData();
    this.initializeChartData2();
    this.initializeChartData3();
    this.getNumOfPhoneRequest();
    this.getNumOfMaintenaceRequest();
    this.date = new Date();
    this.date = new Date();
    this.startDate = new Date();
    this.endDate = new Date();
    this.fetchFilteredSubEquipmentRequests(this.startDate, this.endDate);
    // this.fetchFilteredSubEquipmentRequests(currentYear, currentMonth, currentDay);

    this.setupChartOptions();
  }

  value = [
    { label: 'Users', color1: '#34d399', color2: '#fbbf24', value: 50, data: this.numberofusers, icon: 'pi pi-users' },
    { label: 'IT Asset requests', color1: '#fbbf24', color2: '#60a5fa', value: 25, data: this.numberofReq, icon: 'pi pi-inbox' },
    { label: 'Phone requests', color1: '#60a5fa', color2: '#c084fc', value: 25, data: this.numberofPhoneReq, icon: 'pi pi-inbox' },
    { label: 'Maintenance requests', color1: '#EA8300', color2: '#EA8300', value: 25, data: this.numberofMainReq, icon: 'pi pi-inbox' }
  
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
  getNumOfMaintenaceRequest() {
    this.maintenanceServiceService.getNumberOfRequests().subscribe(
      (data: any) => {
        console.log('Number of requests:', data); // Debugging line
        this.numberofMainReq = data;
        this.updateValueArray();
      },
      (error) => {
        console.error('An error occurred while fetching number of requests:', error);
      }
    );
  }
  getNumOfPhoneRequest() {
    this.phoneReqService.getRequestCounts().subscribe(
      (data: any) => {
        console.log('Number of phone requests:', data); // Debugging line
        this.numberofPhoneReq = data;
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
    this.value[2].data = this.numberofPhoneReq;
    this.value[3].data = this.numberofMainReq;
  }

  onDateRangeChange() {
    if (this.startDate && this.endDate) {
      this.fetchFilteredSubEquipmentRequests(this.startDate, this.endDate);
    }
  }

  fetchFilteredSubEquipmentRequests(startDate: Date, endDate?: Date) {
    const start = this.formatDate(startDate);
    const end = endDate ? this.formatDate(endDate) : null;

    this.equipementReqService.MonthlyExpenditure(start, end).subscribe((data: any) => {
      console.log('Filtered expenditure data:', data);
      if (data.length === 0) {
        this.data2 = null;
      } else {
        this.updateChart(data);
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
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
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
  
    });
    
  }
  initializeChartData2() {
    this.phoneReqService.getPhoneRequestCounts().subscribe(counts => {
      console.log('Request counts:', counts); // Debugging line
      this.phonedata = {
        labels: ['Open', 'In Progress', 'Waiting For HR', 'Waiting for IT','Approved', 'Rejected'],
        datasets: [
          {
            label: 'Phone/Modem Request',
            backgroundColor: [
            
            '#e9844070', // Blue
            '#E98300', // Orange
            '#167A87', // Teal
            '#2E4957', // Pink
            '#8FB838', 
            'red'  // Yellow
            ],
            borderColor: [
             '#e9844070', // Blue
            '#E98300', // Orange
         
            '#167A87', // Teal
            '#2E4957', // red
            '#8FB838', // Purple
            'red'  
            ],
            data: [
              counts.open,
              counts.inProgress,
              counts.waitingForHR,
              counts.waitingForIT,
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

  initializeChartData3() {
    this.maintenanceServiceService.getRequestCounts().subscribe(counts => {
      console.log('Maintenance Request counts:', counts); // Debugging line
      this.Maintedata = {
        labels: ['Open', 'Waiting For Finance', 'Waiting for PR', 'Waiting for PO', 'Approved', 'Rejected'],
        datasets: [
          {
            label: 'Maintenance Request',
            backgroundColor: [
            
            '#e9844070', // Blue
            '#A4D4E6', // Red
            '#167A87', // Teal
            '#2E4957', // Pink
            '#8FB838', // Purple
            'red'  // Yellow
            ],
            borderColor: [
             '#e9844070', // Blue
            '#A4D4E6', // Red
            '#167A87', // Teal
            '#2E4957', // red
            '#8FB838', // Purple
            'red'  // Yellow
            ],
            data: [
              counts.open,
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
