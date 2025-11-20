import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stk-select-input',
  imports: [MatIcon],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
})
export class SelectInput {
  isOpen: boolean = false;

  @Input() options: string[] = [];
  @Input() selectedOption: string = '';

  @Output() optionSelected = new EventEmitter<string>();

  onSelect(option: string): void {
    this.optionSelected.emit(option);
    this.isOpen = false;
  }

  toggleOptions(): void {
    this.isOpen = !this.isOpen;
  }
}
