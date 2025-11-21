import {
  Component,
  EventEmitter,
  Input,
  Output,
  type OnChanges,
  type SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'stk-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss',
})
export class ConfirmModal implements OnChanges {
  @Input() isOpen = false;
  @Input() title = 'Confirmar ação';
  @Input() message = 'Tem certeza que deseja continuar?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  shouldRender = false;
  isAnimating = false;
  private animationTimeout?: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        // Abrir modal
        this.shouldRender = true;
        setTimeout(() => {
          this.isAnimating = true;
        }, 10);
      } else {
        // Fechar modal
        this.isAnimating = false;
        this.animationTimeout = window.setTimeout(() => {
          this.shouldRender = false;
        }, 300); // Duração da animação
      }
    }
  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  onOverlayClick(event: MouseEvent) {
    this.onCancel();
  }

  ngOnDestroy() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }
}
