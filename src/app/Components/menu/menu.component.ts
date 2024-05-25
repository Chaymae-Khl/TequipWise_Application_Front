import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isAuthenticated: boolean;

  constructor(private route: ActivatedRoute) {
    // Access the resolved data
    this.isAuthenticated = this.route.snapshot.data['isAuthenticated'];
  
  }
}
