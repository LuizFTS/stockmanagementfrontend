import { Component, EventEmitter, Input, Output } from '@angular/core';

enum ButtonModels {
  GREEN,
  BLACK,
}

@Component({
  selector: 'stk-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: string = 'button';
  @Input() model: ButtonModels = ButtonModels.GREEN;

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
