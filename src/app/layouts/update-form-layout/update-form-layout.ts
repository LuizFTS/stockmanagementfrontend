import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { BackButton } from '../../shared/components/back-button/back-button';
import { Router } from '@angular/router';
import { ReactiveFormsModule, type FormGroup } from '@angular/forms';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'stk-update-form-layout',
  imports: [Card, BackButton, ReactiveFormsModule, Button],
  templateUrl: './update-form-layout.html',
  styleUrl: './update-form-layout.scss',
})
export class UpdateFormLayout {
  @Input() title: string = '';
  @Input() subtitle: string = '';

  @Input() backPath: string = '';
  @Input() form!: FormGroup;
  @Input() isUpdating: boolean = false;
  @Input() isDeactivating: boolean = false;

  @Output() submit = new EventEmitter<void>();
  @Output() deactivate = new EventEmitter<void>();

  constructor(private router: Router) {}

  onSubmit() {
    this.submit.emit();
  }

  onDeactivate() {
    this.deactivate.emit();
  }

  navigate() {
    this.router.navigate([this.backPath]);
  }
}
