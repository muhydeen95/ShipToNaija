import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ongoing-survey-card',
  templateUrl: './ongoing-survey-card.component.html',
  styleUrls: ['./ongoing-survey-card.component.scss'],
})
export class OngoingSurveyCardComponent implements OnInit {
  @Input() address: any | null = null;

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
