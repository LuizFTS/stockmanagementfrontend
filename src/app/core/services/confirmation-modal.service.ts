import { Injectable, signal } from '@angular/core';

export interface ModalConfig {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  isOpen = signal(false);
  title = signal('Confirmar ação');
  message = signal('');
  confirmText = signal('Confirmar');
  cancelText = signal('Cancelar');

  private confirmCallback?: () => void;
  private cancelCallback?: () => void;

  open(config: ModalConfig): Promise<boolean> {
    this.title.set(config.title || 'Confirmar ação');
    this.message.set(config.message);
    this.confirmText.set(config.confirmText || 'Confirmar');
    this.cancelText.set(config.cancelText || 'Cancelar');
    this.isOpen.set(true);

    return new Promise((resolve) => {
      this.confirmCallback = () => {
        this.isOpen.set(false);
        resolve(true);
      };

      this.cancelCallback = () => {
        this.isOpen.set(false);
        resolve(false);
      };
    });
  }

  confirm() {
    this.confirmCallback?.();
  }

  cancel() {
    this.cancelCallback?.();
  }
}
