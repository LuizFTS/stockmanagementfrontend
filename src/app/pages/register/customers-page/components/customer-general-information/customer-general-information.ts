import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { Button } from '../../../../../shared/components/button/button';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import { BackButton } from '../../../../../shared/components/back-button/back-button';

@Component({
  selector: 'stk-customer-general-information',
  imports: [Button, TextInput, BackButton],
  templateUrl: './customer-general-information.html',
  styleUrl: './customer-general-information.scss',
})
export class CustomerGeneralInformation {
  @Input() form!: FormGroup;
  @Input() isLoading: boolean = false;

  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
