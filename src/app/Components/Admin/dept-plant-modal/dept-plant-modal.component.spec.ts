import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptPlantModalComponent } from './dept-plant-modal.component';

describe('DeptPlantModalComponent', () => {
  let component: DeptPlantModalComponent;
  let fixture: ComponentFixture<DeptPlantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeptPlantModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeptPlantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
