import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dock',
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.css'
})
export class DockComponent implements OnInit {
  items!: MenuItem[];
  ngOnInit(): void {
    this.items = [

      {
        icon: 'pi pi-trash',

      },
      {
        icon: 'pi pi-upload',
        routerLink: ['/fileupload'],
      },
      {
        icon: 'pi pi-external-link',
        target: '_blank',
        url: 'http://angular.io',
      }, 
      {
        icon: 'pi pi-home',
        routerLink: ["/"],
      },
      {
        icon: 'pi pi-bars',
        routerLink: ["/Menu"],
      }
    ];

  }
}
