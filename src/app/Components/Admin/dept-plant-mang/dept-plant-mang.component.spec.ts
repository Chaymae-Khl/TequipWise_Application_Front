import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptPlantMangComponent } from './dept-plant-mang.component';

describe('DeptPlantMangComponent', () => {
  let component: DeptPlantMangComponent;
  let fixture: ComponentFixture<DeptPlantMangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeptPlantMangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeptPlantMangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
