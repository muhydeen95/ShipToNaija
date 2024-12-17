import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss'],
})
export class OfflineComponent {
  @Input() message = 'Something went wrong.';
  @Input() requestFailed: boolean;

  @Output() tryAgain = new EventEmitter<boolean>();

  constructor(private _helper: HelperService) {}

  emitTryAgain() {
    this.tryAgain.emit(true);
  }

  get isOnline$(): Observable<boolean> {
    return this._helper.online$;
  }
}
