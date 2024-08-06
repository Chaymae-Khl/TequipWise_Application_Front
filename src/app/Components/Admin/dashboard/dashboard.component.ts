import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexXAxis } from 'ngx-apexcharts';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { EquipementRequestServiceService } from '../../../Services/equipement-request-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  numberofusers: number = 0; 
  numberofReq: number = 0; 
  data: any;
  options: any;
  data2: any;
  options2: any;
  basicData: any;

  basicOptions: any;
  
constructor(  private Authservice:AuthServiceService,private equipementReqService: EquipementRequestServiceService){}
  ngOnInit(): void {
    this.getNumofUsers();
    this.getNumOfRequest();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
   
    this.data = {
      labels: ['Open', 'In Progress', 'Waiting For finance', 'Waiting for PR', 'Waiting for PO', 'Approved', 'Rejected'],
      datasets: [
          {
              label:'It Assets Request',
              backgroundColor: [
                  documentStyle.getPropertyValue('--blue-500'),
                  documentStyle.getPropertyValue('--cyan-500'),
                  documentStyle.getPropertyValue('--yellow-500'),
                  documentStyle.getPropertyValue('--orange-500'),
                  documentStyle.getPropertyValue('--gray-500'),
                  documentStyle.getPropertyValue('--green-500'),
                  documentStyle.getPropertyValue('--red-500')
              ],
              borderColor: [
                documentStyle.getPropertyValue('--blue-500'),
                documentStyle.getPropertyValue('--cyan-500'),
                documentStyle.getPropertyValue('--yellow-500'),
                documentStyle.getPropertyValue('--orange-500'),
                documentStyle.getPropertyValue('--gray-500'),
                documentStyle.getPropertyValue('--green-500'),
                documentStyle.getPropertyValue('--red-500')
              ],
              data: [65, 59, 80, 81, 56, 55, 40]
          }
      ]
  };
 
    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
               
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
          {
              label: 'Sales',
              data: [540, 325, 702, 620],
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
          }
      ]
  };

  this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };




    
  }
  value = [
    { label: 'Users', color1: '#34d399', color2: '#fbbf24', value: 50,data: this.numberofusers, icon: 'pi pi-users' },
    { label: 'IT Asset Requests', color1: '#fbbf24', color2: '#60a5fa', value: 25,data:this.numberofReq, icon: 'pi pi-inbox' },
    { label: 'Phone Requests', color1: '#60a5fa', color2: '#c084fc', value: 25,data:0, icon: 'pi pi-inbox' }
];
getNumofUsers(){
  this.Authservice.getNumUsers().subscribe(
    (data:any)=>{
      this.numberofusers=data;
      this.updateValueArray();
    },
    (error)=>{
      console.error('An error occurred while fetching nuber of Users:', error);
    }
  )
}

getNumOfRequest(){
  this.equipementReqService.NumberOfRequest().subscribe(
    (data:any)=>{
      this.numberofReq=data;
      this.updateValueArray();
    },
    (error)=>{
      console.error('An error occurred while fetching nuber of Users:', error);
    }
  )
}
updateValueArray() {
  this.value[0].data = this.numberofusers; // Mettez à jour les données pour le nombre d'utilisateurs
  this.value[1].data = this.numberofReq; // Mettez à jour les données pour le nombre d'utilisateurs
}
}
