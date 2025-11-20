import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Button } from '../../../../../shared/components/button/button';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import { BackButton } from '../../../../../shared/components/back-button/back-button';

@Component({
  selector: 'stk-supplier-general-information',
  imports: [Button, TextInput, BackButton],
  templateUrl: './supplier-general-information.html',
  styleUrl: './supplier-general-information.scss',
})
export class SupplierGeneralInformation {
  @Input() form!: FormGroup;

  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
