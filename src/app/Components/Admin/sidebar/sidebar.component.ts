import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements AfterViewInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const sidebarToggler = this.elRef.nativeElement.querySelector('.sidebar-toggler');
    this.renderer.listen(sidebarToggler, 'click', (event) => {
      const sidebar = this.elRef.nativeElement.querySelector('.sidebar');
      const content = this.elRef.nativeElement.querySelector('.content');
      if (sidebar.classList.contains('open')) {
        this.renderer.removeClass(sidebar, 'open');
        this.renderer.removeClass(content, 'open');
      } else {
        this.renderer.addClass(sidebar, 'open');
        this.renderer.addClass(content, 'open');
      }
      event.preventDefault();
    });
  }

 
}