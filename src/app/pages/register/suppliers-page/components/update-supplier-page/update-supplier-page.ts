import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SupplierService } from '../../../../../core/services/api/supplier.service';
import type { Supplier } from '../../../../../core/models/Supplier.model';
import { ConfirmationModalService } from '../../../../../core/services/confirmation-modal.service';
import { ResponseMessageService } from '../../../../../core/services/response-message.service';
import { UpdateFormLayout } from '../../../../../layouts/update-form-layout/update-form-layout';

@Component({
  selector: 'app-update-supplier-page',
  imports: [TextInput, ReactiveFormsModule, UpdateFormLayout],
  templateUrl: './update-supplier-page.html',
  styleUrl: './update-supplier-page.scss',
})
export class UpdateSupplierPage {
  updateForm: FormGroup;
  isDeactivating: boolean = false;
  isUpdating: boolean = false;
  id: string = '';

  supplier: Supplier | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private modalService: ConfirmationModalService,
    private responseMessageService: ResponseMessageService,
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
        this.responseMessageService.success('Cadastrado atualizado!');

        setTimeout(() => {
          this.navigate('/suppliers');
        }, 2000);
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
      message: 'Tem certeza que deseja desativar este fornecedor?',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) return;
    this.isDeactivating = true;
    this.supplierService.deactivate({ id: this.id }).subscribe({
      next: () => {
        this.responseMessageService.success('Fornecedor desativado!');

        setTimeout(() => {
          this.navigate('/suppliers');
        }, 3000);
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
