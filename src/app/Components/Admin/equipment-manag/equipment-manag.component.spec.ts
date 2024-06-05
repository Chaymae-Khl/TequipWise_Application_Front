import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentManagComponent } from './equipment-manag.component';

describe('EquipmentManagComponent', () => {
  let component: EquipmentManagComponent;
  let fixture: ComponentFixture<EquipmentManagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentManagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipmentManagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
