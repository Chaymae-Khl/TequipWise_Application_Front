import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentRequestDetailsComponent } from './equipment-request-details.component';

describe('EquipmentRequestDetailsComponent', () => {
  let component: EquipmentRequestDetailsComponent;
  let fixture: ComponentFixture<EquipmentRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentRequestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipmentRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
