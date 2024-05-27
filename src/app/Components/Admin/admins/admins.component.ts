import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent {
  isAuthenticated: boolean;
  items: MenuItem[] | undefined;

  position: string = 'right';

  ngOnInit() {
  }
  constructor(private route: ActivatedRoute) {
    // Access the resolved data
    this.isAuthenticated = this.route.snapshot.data['isAuthenticated'];
  }
}
