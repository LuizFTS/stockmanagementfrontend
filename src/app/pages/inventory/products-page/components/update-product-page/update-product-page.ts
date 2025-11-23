import { Component, inject } from '@angular/core';
import { MessageNotificationComponent } from '../../../../../shared/components/message-notification-component/message-notification-component';
import { Button } from '../../../../../shared/components/button/button';
import { Card } from '../../../../../shared/components/card/card';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import { BackButton } from '../../../../../shared/components/back-button/back-button';
import { ReactiveFormsModule, type FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationModalService } from '../../../../../core/services/confirmation-modal.service';
import { ProductService } from '../../../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../../../../core/models/Product.model';
import { Formatter } from '../../../../../shared/utils/Formatter';
import type { ResponseStatus } from '../../../../../core/models/ResponseStatus.model';

@Component({
  selector: 'app-update-product-page',
  imports: [Button, Card, TextInput, BackButton, ReactiveFormsModule, MessageNotificationComponent],
  templateUrl: './update-product-page.html',
  styleUrl: './update-product-page.scss',
})
export class UpdateProductPage {
  private router = inject(Router);
  private modalService = inject(ConfirmationModalService);

  messageDisplayed: ResponseStatus = { status: '', message: '' };
  updateForm: FormGroup;
  isDeactivating: boolean = false;
  isUpdating: boolean = false;
  id: string = '';

  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.updateForm = this.createUpdateForm();
  }

  private createUpdateForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      costPrice: ['', [Validators.required]],
      salePrice: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id ?? '';

    this.productService.get(0, 1, { id: this.id }).subscribe({
      next: (response) => {
        const product = response.content[0];
        this.product = product;

        this.updateForm.patchValue({
          name: Formatter.capitalize(product.name),
          description: Formatter.capitalize(product.description),
          costPrice: Formatter.priceToString(product.costPrice),
          salePrice: Formatter.priceToString(product.salePrice),
        });
      },
    });
  }

  onUpdateProduct() {
    if (this.updateForm.invalid) return;
    this.isUpdating = true;

    const formValue = this.updateForm.value;

    const updateData = {
      id: this.id,
      name: formValue.name,
      description: formValue.description,
      costPrice: Formatter.priceToNumber(formValue.costPrice),
      salePrice: Formatter.priceToNumber(formValue.salePrice),
    };

    this.productService.update(updateData).subscribe({
      next: () => {
        this.messageDisplayed = {
          status: 'success',
          message: 'Cadastrado atualizado!',
        };

        setTimeout(() => {
          this.navigate('/inventory/products');
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
    this.productService.deactivate({ id: this.id }).subscribe({
      next: () => {
        this.messageDisplayed = {
          status: 'success',
          message: 'Produto desativado!',
        };

        setTimeout(() => {
          this.navigate('/products');
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
