import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartemnentListModalComponent } from './departemnent-list-modal.component';

describe('DepartemnentListModalComponent', () => {
  let component: DepartemnentListModalComponent;
  let fixture: ComponentFixture<DepartemnentListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartemnentListModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartemnentListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
