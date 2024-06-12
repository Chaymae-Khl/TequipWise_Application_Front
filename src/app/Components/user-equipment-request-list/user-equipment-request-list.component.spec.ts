import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEquipmentRequestListComponent } from './user-equipment-request-list.component';

describe('UserEquipmentRequestListComponent', () => {
  let component: UserEquipmentRequestListComponent;
  let fixture: ComponentFixture<UserEquipmentRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEquipmentRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEquipmentRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
