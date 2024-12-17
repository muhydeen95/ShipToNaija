import { HelperService } from '@core/services/helper.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-analytic-card',
  templateUrl: './analytic-card.component.html',
  styleUrls: ['./analytic-card.component.scss'],
})
export class AnalyticCardComponent {
  @Input() cardData: any;
  @Input() icon: string;
  @Input() title: any;
  @Input() value: number;
  @Input() gross: string;
  @Input() rate: number;
  @Input() status: string;

  @Output() buttonEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private helperService: HelperService) {}

  onCardClicked(): void {
    const documentRouteStatus = this.helperService.AES_Encryption_Decryption(
      'encrypt',
      JSON.stringify(this.getCardStatus())
    );

    this.router.navigate(['app/document'], {
      queryParams: { documentRouteStatus },
    });
  }

  getCardStatus(): number {
    switch (true) {
      // case this.cardData.name.toLowerCase() === 'Total Documents'.toLowerCase():
      //   return DocumentStatus.Draft;

      // case this.cardData.name.toLowerCase() === 'Total Drafts'.toLowerCase():
      //   return DocumentStatus.Draft;

      // case this.cardData.name.toLowerCase() === 'Total Expired'.toLowerCase():
      //   return DocumentStatus.Expired;

      // case this.cardData.name.toLowerCase() === 'Sent'.toLowerCase():
      //   return DocumentStatus.Sent;

      // case this.cardData.name.toLowerCase() === 'Total Completed'.toLowerCase():
      //   return DocumentStatus.Completed;

      default:
        return 1;
    }
  }
}
