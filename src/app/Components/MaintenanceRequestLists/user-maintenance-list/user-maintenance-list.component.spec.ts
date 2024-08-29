import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMaintenanceListComponent } from './user-maintenance-list.component';

describe('UserMaintenanceListComponent', () => {
  let component: UserMaintenanceListComponent;
  let fixture: ComponentFixture<UserMaintenanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMaintenanceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMaintenanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
