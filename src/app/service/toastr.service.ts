import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { ToastrComponent } from '../components/toastr/toastr.component';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  private overlayRef!: OverlayRef

  constructor(private overlay: Overlay, private injector: Injector) {}

  showSuccess(message: string) {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position()
        .global()
        .top('20px')
        .centerHorizontally(),
      hasBackdrop: false,
    });

    const toastrPortal = new ComponentPortal(ToastrComponent, null, this.injector);
    const toastrRef: ComponentRef<ToastrComponent> = this.overlayRef.attach(toastrPortal);

    toastrRef.instance.message = message;

    setTimeout(() => this.overlayRef.detach(), 3000);
  }
}
