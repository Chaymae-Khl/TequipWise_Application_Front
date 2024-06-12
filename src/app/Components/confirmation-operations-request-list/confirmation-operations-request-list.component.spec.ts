import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationOperationsRequestListComponent } from './confirmation-operations-request-list.component';

describe('ConfirmationOperationsRequestListComponent', () => {
  let component: ConfirmationOperationsRequestListComponent;
  let fixture: ComponentFixture<ConfirmationOperationsRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationOperationsRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationOperationsRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
