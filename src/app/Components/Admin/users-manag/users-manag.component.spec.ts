import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagComponent } from './users-manag.component';

describe('UsersManagComponent', () => {
  let component: UsersManagComponent;
  let fixture: ComponentFixture<UsersManagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersManagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersManagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
