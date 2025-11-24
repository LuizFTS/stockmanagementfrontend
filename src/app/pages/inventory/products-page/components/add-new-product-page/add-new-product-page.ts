import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, Validators, FormBuilder, type FormGroup } from '@angular/forms';
import { Button } from '../../../../../shared/components/button/button';
import { Card } from '../../../../../shared/components/card/card';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import { BackButton } from '../../../../../shared/components/back-button/back-button';
import { MessageNotificationComponent } from '../../../../../shared/components/message-notification-component/message-notification-component';
import type { Product } from '../../../../../core/models/Product.model';
import { ProductService } from '../../../../../core/services/product.service';
import type { ResponseStatus } from '../../../../../core/models/ResponseStatus.model';
import { Formatter } from '../../../../../shared/utils/Formatter';
import { CustomValidators } from '../../../../../shared/utils/CustomValidators';

@Component({
  selector: 'app-add-new-product-page',
  imports: [Button, Card, TextInput, BackButton, ReactiveFormsModule, MessageNotificationComponent],
  templateUrl: './add-new-product-page.html',
  styleUrl: './add-new-product-page.scss',
})
export class AddNewProductPage {
  private router = inject(Router);

  messageDisplayed: ResponseStatus = { status: '', message: '' };
  createForm: FormGroup;
  isLoading: boolean = false;

  product: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.createForm = this.createCreateForm();
  }

  private createCreateForm(): FormGroup {
    return this.fb.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        costPrice: ['', [Validators.required, CustomValidators.price()]],
        salePrice: ['', [Validators.required, CustomValidators.price()]],
      },
      {
        validators: this.pricesValidator,
      },
    );
  }

  onCreateProduct() {
    if (this.createForm.invalid) return;
    this.isLoading = true;

    const formValue = this.createForm.value;

    const createData = {
      name: formValue.name.toLowerCase(),
      description: formValue.description.toLowerCase(),
      costPrice: Formatter.priceToNumber(formValue.costPrice),
      salePrice: Formatter.priceToNumber(formValue.salePrice),
    };

    this.productService.create(createData).subscribe({
      next: () => {
        this.messageDisplayed = {
          status: 'success',
          message: 'Produto cadastrado!',
        };

        setTimeout(() => {
          this.navigate('/inventory/products');
        }, 2000);
        this.isLoading = false;
      },
      error: ({ error }) => {
        this.messageDisplayed = {
          status: 'error',
          message: error.message ?? 'Tente novamente mais tarde',
        };
        this.isLoading = false;
      },
    });

    this.showMessageHandle();
  }

  showMessageHandle() {
    setTimeout(() => {
      this.messageDisplayed = { status: '', message: '' };
    }, 5000);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  private pricesValidator(form: FormGroup) {
    const costPrice = Formatter.priceToNumber(form.get('costPrice')?.value);
    const salePrice = Formatter.priceToNumber(form.get('salePrice')?.value);

    if (costPrice > salePrice) {
      form.get('salePrice')?.setErrors({ pricesInvalid: true });
    }
  }
}
