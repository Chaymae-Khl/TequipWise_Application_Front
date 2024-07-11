import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationEquipmentListComponent } from './confirmation-equipment-list.component';

describe('ConfirmationEquipmentListComponent', () => {
  let component: ConfirmationEquipmentListComponent;
  let fixture: ComponentFixture<ConfirmationEquipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationEquipmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationEquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
