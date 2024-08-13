import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPhoneListComponent } from './confirmation-phone-list.component';

describe('ConfirmationPhoneListComponent', () => {
  let component: ConfirmationPhoneListComponent;
  let fixture: ComponentFixture<ConfirmationPhoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationPhoneListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationPhoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
