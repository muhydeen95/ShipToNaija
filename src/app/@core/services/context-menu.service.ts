import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Injectable,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService implements OnDestroy {
  overlayRef: OverlayRef | null;
  documentClickSubscripton: Subscription;
  event: any;

  constructor(public overlay: Overlay) {}

  openContextMenu(
    event: MouseEvent,
    data: any,
    contextMenu: TemplateRef<any>,
    viewContainerRef: ViewContainerRef
  ) {
    this.event = event;

    this.closeContextMenu();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x: event.x, y: event.y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
        // {
        //   originX: 'end',
        //   originY: 'bottom',
        //   overlayX: 'start',
        //   overlayY: 'bottom',
        // },
      ]);

    this.overlayRef = this.overlay.create({
      hasBackdrop: event.type === 'click' ? true : false,
      backdropClass: '',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new TemplatePortal(contextMenu, viewContainerRef, {
        $implicit: data,
      })
    );

    if (event.type === 'contextmenu') {
      this.documentClickSubscripton = fromEvent<MouseEvent>(document, 'click')
        .pipe(
          filter((event) => {
            const clickTarget = event.target as HTMLElement;

            return (
              !!this.overlayRef &&
              !this.overlayRef.overlayElement.contains(clickTarget)
            );
          }),
          take(1)
        )
        .subscribe(() => this.closeContextMenu());
    } else if (event.type === 'click') {
      this.overlayRef.backdropElement?.addEventListener(
        'contextmenu',
        (event) => {
          event.preventDefault(); //Prevent default context menu from opening throught the backdrop
        }
      );

      this.overlayRef.backdropClick().subscribe(() => {
        this.closeContextMenu();
      });
    }
  }

  closeContextMenu() {
    this.documentClickSubscripton &&
      this.documentClickSubscripton.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnDestroy(): void {
    if (this.documentClickSubscripton) {
      this.documentClickSubscripton.unsubscribe();
    }
  }
}
