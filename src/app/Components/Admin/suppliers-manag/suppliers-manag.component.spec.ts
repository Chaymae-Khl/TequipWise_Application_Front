import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersManagComponent } from './suppliers-manag.component';

describe('SuppliersManagComponent', () => {
  let component: SuppliersManagComponent;
  let fixture: ComponentFixture<SuppliersManagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliersManagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppliersManagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
