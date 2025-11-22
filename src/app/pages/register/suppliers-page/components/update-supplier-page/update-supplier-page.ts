import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../../../../shared/components/button/button';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import { BackButton } from '../../../../../shared/components/back-button/back-button';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Card } from '../../../../../shared/components/card/card';
import { SupplierService } from '../../../../../core/services/supplier.service';
import type { Supplier } from '../../../../../core/models/Supplier.model';
import { MessageNotificationComponent } from '../../../../../shared/components/message-notification-component/message-notification-component';
import { ConfirmationModalService } from '../../../../../core/services/confirmation-modal.service';

interface Message {
  status: string;
  message: string;
}

@Component({
  selector: 'app-update-supplier-page',
  imports: [Button, Card, TextInput, BackButton, ReactiveFormsModule, MessageNotificationComponent],
  templateUrl: './update-supplier-page.html',
  styleUrl: './update-supplier-page.scss',
})
export class UpdateSupplierPage {
  private router = inject(Router);
  private modalService = inject(ConfirmationModalService);

  messageDisplayed: Message = { status: '', message: '' };
  updateForm: FormGroup;
  isDeactivating: boolean = false;
  isUpdating: boolean = false;
  id: string = '';

  supplier: Supplier | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private supplierService: SupplierService,
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
    this.supplierService.get(0, 1, { id: this.id }).subscribe({
      next: (response) => {
        const supplier = response.content[0];
        this.supplier = supplier;

        this.updateForm.patchValue({
          phone: supplier.phone,
          email: supplier.email,
        });
      },
    });
  }

  onUpdateSupplier() {
    if (this.updateForm.invalid) return;
    this.isUpdating = true;

    const formValue = this.updateForm.value;

    const updateData = {
      id: this.id,
      phone: formValue.phone.replace(/\D/g, ''),
      email: formValue.email,
    };

    this.supplierService.update(updateData).subscribe({
      next: () => {
        this.messageDisplayed = {
          status: 'success',
          message: 'Cadastrado atualizado!',
        };

        setTimeout(() => {
          this.navigate('/suppliers');
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
      message: 'Tem certeza que deseja desativar este fornecedor?',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) return;
    this.isDeactivating = true;
    this.supplierService.deactivate({ id: this.id }).subscribe({
      next: () => {
        this.messageDisplayed = {
          status: 'success',
          message: 'Fornecedor desativado!',
        };

        setTimeout(() => {
          this.navigate('/suppliers');
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
