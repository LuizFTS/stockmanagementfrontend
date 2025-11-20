import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../../../../shared/components/button/button';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import type { FormGroup } from '@angular/forms';

@Component({
  selector: 'stk-supplier-tax-id',
  imports: [Button, TextInput],
  templateUrl: './supplier-tax-id.html',
  styleUrl: './supplier-tax-id.scss',
})
export class SupplierTaxId {
  @Input() form!: FormGroup;

  @Output() nextStep = new EventEmitter<void>();

  next() {
    this.nextStep.emit();
  }
}
