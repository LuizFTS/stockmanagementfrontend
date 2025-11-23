import { Component, inject } from '@angular/core';
import { Button } from '../../../../../shared/components/button/button';
import { Card } from '../../../../../shared/components/card/card';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import { BackButton } from '../../../../../shared/components/back-button/back-button';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageNotificationComponent } from '../../../../../shared/components/message-notification-component/message-notification-component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationModalService } from '../../../../../core/services/confirmation-modal.service';
import type { Customer } from '../../../../../core/models/Customer.model';
import { CustomerService } from '../../../../../core/services/customer.service';
import type { ResponseStatus } from '../../../../../core/models/ResponseStatus.model';

@Component({
  selector: 'stk-update-customer-page',
  imports: [Button, Card, TextInput, BackButton, ReactiveFormsModule, MessageNotificationComponent],
  templateUrl: './update-customer-page.html',
  styleUrl: './update-customer-page.scss',
})
export class UpdateCustomerPage {
  private router = inject(Router);
  private modalService = inject(ConfirmationModalService);

  messageDisplayed: ResponseStatus = { status: '', message: '' };
  updateForm: FormGroup;
  isDeactivating: boolean = false;
  isUpdating: boolean = false;
  id: string = '';

  customer: Customer | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
  ) {
    this.updateForm = this.createUpdateForm();
    this.id = this.route.snapshot.params['id'];
  }

  private createUpdateForm(): FormGroup {
    return this.fb.group({
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.customerService.get(0, 1, { id: this.id }).subscribe({
      next: (response) => {
        const customer = response.content[0];
        this.customer = customer;

        this.updateForm.patchValue({
          phone: customer.phone,
          email: customer.email,
        });
      },
    });
  }

  onUpdateCustomer() {
    if (this.updateForm.invalid) return;
    this.isUpdating = true;

    const formValue = this.updateForm.value;

    const updateData = {
      id: this.id,
      phone: formValue.phone.replace(/\D/g, ''),
      email: formValue.email,
    };

    this.customerService.update(updateData).subscribe({
      next: () => {
        this.messageDisplayed = {
          status: 'success',
          message: 'Cadastrado atualizado!',
        };

        setTimeout(() => {
          this.navigate('/customers');
        }, 2000);
        this.isUpdating = false;
      },
      error: (err) => {
        this.messageDisplayed = {
          status: 'error',
          message: err.error.message ?? 'Tente novamente mais tarde',
        };
        this.isUpdating = false;
      },
    });

    this.showMessageHandle();
  }

  showMessageHandle() {
    setTimeout(() => {
      this.messageDisplayed = { status: '', message: '' };
    }, 5000);
  }

  async deactivate() {
    const confirmed = await this.modalService.open({
      title: 'Confirmar desativação',
      message: 'Tem certeza que deseja desativar este cliente?',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) return;
    this.isDeactivating = true;
    this.customerService.deactivate({ id: this.id }).subscribe({
      next: () => {
        this.messageDisplayed = {
          status: 'success',
          message: 'Cliente desativado!',
        };

        setTimeout(() => {
          this.navigate('/customers');
        }, 3000);
        this.isDeactivating = false;
      },
      error: (err) => {
        this.messageDisplayed = {
          status: 'error',
          message: err.error.message ?? 'Tente novamente mais tarde',
        };
        this.isDeactivating = false;
      },
    });
    this.showMessageHandle();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
