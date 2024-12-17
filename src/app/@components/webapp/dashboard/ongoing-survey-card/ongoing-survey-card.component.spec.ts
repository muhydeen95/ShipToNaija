import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingSurveyCardComponent } from './ongoing-survey-card.component';

describe('OngoingSurveyCardComponent', () => {
  let component: OngoingSurveyCardComponent;
  let fixture: ComponentFixture<OngoingSurveyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingSurveyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingSurveyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
