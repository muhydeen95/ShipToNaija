import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private overlayRef: any = null;

  constructor(private overlay: Overlay) {}

  openSideDialog<T>(component: Type<T>) {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'saw-dialog-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .right('0.5rem')
        .top('0'),
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef.attach(new ComponentPortal(component));

    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
