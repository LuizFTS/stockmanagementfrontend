import { Component } from '@angular/core';
import { Stepper } from '../../../../shared/components/stepper/stepper';
import { SearchCustomerSaleStep } from '../search-customer-sale-step/search-customer-sale-step';
import { AddItemsSaleStep } from '../add-items-sale-step/add-items-sale-step';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Card } from '../../../../shared/components/card/card';
import { ConfirmationModalService } from '../../../../core/services/confirmation-modal.service';
import { CustomValidators } from '../../../../shared/utils/CustomValidators';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { SaleService } from '../../../../core/services/api/sale.service';
import type { AddSaleRequest } from '../../../../core/models/request/AddSaleRequest.model';
import { HomeLayout } from '../../../../layouts/home-layout/home-layout';
import { ResponseMessageService } from '../../../../core/services/response-message.service';

export interface SaleItem {
  id: string;
  name: string;
  quantity: string;
  price: number;
}

@Component({
  selector: 'app-new-sale-page',
  imports: [Stepper, SearchCustomerSaleStep, Card, AddItemsSaleStep, ReactiveFormsModule],
  templateUrl: './new-sale-page.html',
  styleUrl: './new-sale-page.scss',
})
export class NewSalePage {
  saleForm: FormGroup = new FormGroup({
    customerName: new FormControl<string>('', { validators: Validators.required }),
    customerId: new FormControl<string>('', { validators: Validators.required }),
    itens: new FormArray([]),
  });

  saleItemForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', { validators: Validators.required }),
    id: new FormControl<string>('', { validators: Validators.required }),
    quantity: new FormControl<string>('', {
      validators: [Validators.required, CustomValidators.quantity()],
    }),
    price: new FormControl<number>(0, { validators: Validators.required }),
  });
  currentStep: number = 1;
  totalSteps: number = 2;

  isLoading: boolean = false;

  constructor(
    private saleService: SaleService,
    private router: Router,
    private modalService: ConfirmationModalService,
    private layout: HomeLayout,
    private responseMessageService: ResponseMessageService,
  ) {}

  get itens(): FormArray {
    return this.saleForm.get('itens') as FormArray;
  }

  addItem(item: any) {
    this.itens.push(
      new FormGroup({
        name: new FormControl<string>(item.name, { validators: Validators.required }),
        id: new FormControl<string>(item.id, { validators: Validators.required }),
        quantity: new FormControl<string>(item.quantity, {
          validators: [Validators.required, CustomValidators.quantity()],
        }),
        price: new FormControl<number>(item.price, { validators: Validators.required }),
      }),
    );
  }

  removeItem(index: number) {
    this.itens.removeAt(index);
  }

  async onAddNewSale() {
    if (this.saleForm.invalid) return;

    const confirmed = await this.modalService.open({
      title: 'Confirmar venda',
      message: 'Tem certeza que deseja confirmar esta venda?',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) return;

    this.isLoading = true;

    const formValue = this.saleForm.value;

    const payload: AddSaleRequest = {
      customerId: formValue.customerId,
      itens: formValue.itens.map((item: SaleItem) => ({
        productId: item.id,
        quantity: parseInt(item.quantity),
      })),
    };

    this.saleService.create(payload).subscribe({
      next: (response) => {
        this.responseMessageService.success('Venda realizada!');

        this.layout.scrollToTop();
        this.navigate(`/sales/${response.content[0].id}`);
        this.isLoading = false;
      },
      error: (err) => {
        this.responseMessageService.error(err.error.message ?? 'Tente novamente mais tarde');
        this.isLoading = false;
      },
    });
  }

  nextStep() {
    this.currentStep++;
  }

  back() {
    this.currentStep--;
  }

  isLoadingChange() {
    this.isLoading = !this.isLoading;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
