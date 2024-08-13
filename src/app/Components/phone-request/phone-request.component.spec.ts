import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneRequestComponent } from './phone-request.component';

describe('PhoneRequestComponent', () => {
  let component: PhoneRequestComponent;
  let fixture: ComponentFixture<PhoneRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
