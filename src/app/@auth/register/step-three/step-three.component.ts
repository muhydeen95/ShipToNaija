import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {
  @Input() email: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
