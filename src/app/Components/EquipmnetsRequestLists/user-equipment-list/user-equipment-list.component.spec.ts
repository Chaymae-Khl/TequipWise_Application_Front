import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEquipmentListComponent } from './user-equipment-list.component';

describe('UserEquipmentListComponent', () => {
  let component: UserEquipmentListComponent;
  let fixture: ComponentFixture<UserEquipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEquipmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
