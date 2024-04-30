import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements AfterViewInit{
   
  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    this.setupArrowClickHandler();
    this.setupSidebarToggleHandler();
  }
  
  private setupArrowClickHandler(): void {
    const arrows = Array.from(this.elementRef.nativeElement.querySelectorAll('.arrow')) as HTMLElement[];
    // console.log('Arrows:', arrows);
    if (arrows.length > 0) {
      arrows.forEach((arrow: HTMLElement) => {
        arrow.addEventListener('click', (e: Event) => {
          const arrowParent = (e.target as HTMLElement).parentElement?.parentElement; // selecting main parent of arrow
          if (arrowParent)
            arrowParent.classList.toggle('showMenu');
        });
      });
    } else {
      console.error('No arrows found.');
    }
  }
  private setupSidebarToggleHandler(): void {
    const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
    const sidebarBtn = this.elementRef.nativeElement.querySelector('.bx-menu');
    
    if (sidebarBtn) {
      sidebarBtn.addEventListener('click', () => {
        sidebar?.classList.toggle('close');
      });
    }
  }
}