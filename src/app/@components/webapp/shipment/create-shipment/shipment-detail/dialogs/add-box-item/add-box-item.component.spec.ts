import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoxItemComponent } from './add-box-item.component';

describe('AddBoxItemComponent', () => {
  let component: AddBoxItemComponent;
  let fixture: ComponentFixture<AddBoxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoxItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
