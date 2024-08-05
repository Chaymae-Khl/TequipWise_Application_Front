import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexXAxis } from 'ngx-apexcharts';
import { AuthServiceService } from '../../../Services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  numberofusers: number = 0; 

  data: any;

  options: any;
constructor(  private Authservice:AuthServiceService){}
  ngOnInit(): void {
    this.getNumofUsers();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
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
  }
  value = [
    { label: 'Users', color1: '#34d399', color2: '#fbbf24', value: 50,data: this.numberofusers, icon: 'pi pi-users' },
    { label: 'IT Asset Requests', color1: '#fbbf24', color2: '#60a5fa', value: 25,data:70, icon: 'pi pi-inbox' },
    { label: 'Phone Requests', color1: '#60a5fa', color2: '#c084fc', value: 25,data:70, icon: 'pi pi-inbox' }
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
updateValueArray() {
  this.value[0].data = this.numberofusers; // Mettez à jour les données pour le nombre d'utilisateurs
}
}
