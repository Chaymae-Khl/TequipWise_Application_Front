import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhoneListComponent } from './user-phone-list.component';

describe('UserPhoneListComponent', () => {
  let component: UserPhoneListComponent;
  let fixture: ComponentFixture<UserPhoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPhoneListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPhoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
