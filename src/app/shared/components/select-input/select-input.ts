import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stk-select-input',
  imports: [MatIcon],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
})
export class SelectInput {
  @ViewChild('selectRef') selectRef!: ElementRef;
  isOpen: boolean = false;
  openUp: boolean = false;

  @Input() options: string[] = [];
  @Input() selectedOption: string = '';

  @Output() optionSelected = new EventEmitter<string>();

  focusedIndex: number = -1;

  constructor(private elementRef: ElementRef) {}

  onSelect(option: string): void {
    this.optionSelected.emit(option);
    this.isOpen = false;
  }

  toggleOptions(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.adjustDropdownPosition();
    }
  }

  adjustDropdownPosition() {
    const rect = this.selectRef.nativeElement.getBoundingClientRect();
    const half = window.innerHeight / 2;

    this.openUp = rect.top > half;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  onBlur(): void {
    this.isOpen = false;
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.isOpen && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
      this.toggleOptions();
      event.preventDefault();
      return;
    }

    if (!this.isOpen) return;

    if (event.key === 'ArrowDown') {
      this.focusedIndex = (this.focusedIndex + 1) % this.options.length;
      event.preventDefault();
    }

    if (event.key === 'ArrowUp') {
      this.focusedIndex = (this.focusedIndex - 1 + this.options.length) % this.options.length;
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      this.onSelect(this.options[this.focusedIndex]);
      event.preventDefault();
    }

    if (event.key === 'Escape') {
      this.isOpen = false;
      event.preventDefault();
    }
  }
}
