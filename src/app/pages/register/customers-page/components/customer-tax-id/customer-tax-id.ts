import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { Button } from '../../../../../shared/components/button/button';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import { BackButton } from '../../../../../shared/components/back-button/back-button';

@Component({
  selector: 'stk-customer-tax-id',
  imports: [Button, TextInput, BackButton],
  templateUrl: './customer-tax-id.html',
  styleUrl: './customer-tax-id.scss',
})
export class CustomerTaxId {
  @Input() form!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();

  next() {
    this.nextStep.emit();
  }

  onEnter() {
    if (this.form.get('taxId')?.valid) {
      this.nextStep.emit();
    }
  }
}
