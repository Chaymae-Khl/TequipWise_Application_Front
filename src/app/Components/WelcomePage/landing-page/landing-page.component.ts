import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  currentYear: any;

  ngOnInit(): void {
    // Initialize the currentYear property with the current year
    this.currentYear = new Date().getFullYear();
  }


}
