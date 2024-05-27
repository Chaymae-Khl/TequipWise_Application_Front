import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dock',
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.css'
})
export class DockComponent implements OnInit  {
  items: MenuItem[] | undefined;
  ngOnInit(): void {
    this.items = [
      {
          icon: '../assets/Icons/Home.png'
      },
      {
          icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg'
      },
      {
          icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg'
      },
      {
          icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
      }
  ];


  }
}
