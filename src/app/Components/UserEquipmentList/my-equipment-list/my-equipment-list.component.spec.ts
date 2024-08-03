import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEquipmentListComponent } from './my-equipment-list.component';

describe('MyEquipmentListComponent', () => {
  let component: MyEquipmentListComponent;
  let fixture: ComponentFixture<MyEquipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyEquipmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyEquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
