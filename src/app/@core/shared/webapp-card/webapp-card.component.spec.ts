import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebappCardComponent } from './webapp-card.component';

describe('WebappCardComponent', () => {
  let component: WebappCardComponent;
  let fixture: ComponentFixture<WebappCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebappCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebappCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
