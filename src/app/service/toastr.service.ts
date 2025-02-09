import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { ToastrComponent } from '../components/toastr/toastr.component';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay, private injector: Injector) {}

  private showToast(message: string, type: 'success' | 'error') {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position()
        .global()
        .bottom('20px') // Toast no canto inferior direito
        .right('20px'),
      hasBackdrop: false,
    });

    const toastrPortal = new ComponentPortal(ToastrComponent, null, this.injector);
    const toastrRef: ComponentRef<ToastrComponent> = this.overlayRef.attach(toastrPortal);

    toastrRef.instance.message = message;
    toastrRef.instance.type = type;

    setTimeout(() => this.overlayRef.detach(), 3000);
  }

  showSuccess(message: string) {
    this.showToast(message, 'success');
  }

  showError(message: string) {
    this.showToast(message, 'error');
  }
}
