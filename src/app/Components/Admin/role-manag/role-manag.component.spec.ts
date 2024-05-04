import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagComponent } from './role-manag.component';

describe('RoleManagComponent', () => {
  let component: RoleManagComponent;
  let fixture: ComponentFixture<RoleManagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleManagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleManagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
