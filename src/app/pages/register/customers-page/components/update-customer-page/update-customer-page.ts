import { Component } from '@angular/core';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationModalService } from '../../../../../core/services/confirmation-modal.service';
import type { Customer } from '../../../../../core/models/Customer.model';
import { CustomerService } from '../../../../../core/services/api/customer.service';
import { ResponseMessageService } from '../../../../../core/services/response-message.service';
import { UpdateFormLayout } from '../../../../../layouts/update-form-layout/update-form-layout';

@Component({
  selector: 'stk-update-customer-page',
  imports: [TextInput, ReactiveFormsModule, UpdateFormLayout],
  templateUrl: './update-customer-page.html',
  styleUrl: './update-customer-page.scss',
})
export class UpdateCustomerPage {
  updateForm: FormGroup = new FormGroup({
    phone: new FormControl<string>('', { validators: Validators.required }),
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
  });
  isDeactivating: boolean = false;
  isUpdating: boolean = false;
  id: string = '';

  customer: Customer | null = null;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private modalService: ConfirmationModalService,
    private responseMessageService: ResponseMessageService,
  ) {
    this.id = this.route.snapshot.params['id'];
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
        this.responseMessageService.success('Cadastrado atualizado!');

        this.navigate('/customers');
        this.isUpdating = false;
      },
      error: (err) => {
        this.responseMessageService.error(err.error.message ?? 'Tente novamente mais tarde');
        this.isUpdating = false;
      },
    });
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
        this.responseMessageService.success('Cliente desativado!');

        this.navigate('/customers');
        this.isDeactivating = false;
      },
      error: (err) => {
        this.responseMessageService.error(err.error.message ?? 'Tente novamente mais tarde');
        this.isDeactivating = false;
      },
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
