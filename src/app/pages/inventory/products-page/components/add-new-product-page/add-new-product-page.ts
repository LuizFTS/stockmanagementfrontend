import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, Validators, FormBuilder, type FormGroup } from '@angular/forms';
import { Button } from '../../../../../shared/components/button/button';
import { Card } from '../../../../../shared/components/card/card';
import { TextInput } from '../../../../../shared/components/text-input/text-input';
import { BackButton } from '../../../../../shared/components/back-button/back-button';
import type { Product } from '../../../../../core/models/Product.model';
import { ProductService } from '../../../../../core/services/product.service';
import { Formatter } from '../../../../../shared/utils/Formatter';
import { CustomValidators } from '../../../../../shared/utils/CustomValidators';
import { ResponseMessageService } from '../../../../../core/services/response-message.service';

@Component({
  selector: 'app-add-new-product-page',
  imports: [Button, Card, TextInput, BackButton, ReactiveFormsModule],
  templateUrl: './add-new-product-page.html',
  styleUrl: './add-new-product-page.scss',
})
export class AddNewProductPage {
  createForm: FormGroup;
  isLoading: boolean = false;

  product: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private responseMessageService: ResponseMessageService,
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
        this.responseMessageService.success('Produto cadastrado!');

        setTimeout(() => {
          this.navigate('/inventory/products');
        }, 2000);
        this.isLoading = false;
      },
      error: ({ error }) => {
        this.responseMessageService.error(error.message ?? 'Tente novamente mais tarde');
        this.isLoading = false;
      },
    });
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
