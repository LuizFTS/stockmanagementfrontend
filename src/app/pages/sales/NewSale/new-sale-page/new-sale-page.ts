import { Component } from '@angular/core';
import { Stepper } from '../../../../shared/components/stepper/stepper';
import { SearchCustomerSaleStep } from '../search-customer-sale-step/search-customer-sale-step';
import { AddItemsSaleStep } from '../add-items-sale-step/add-items-sale-step';
import { ReactiveFormsModule, type FormGroup, type FormArray } from '@angular/forms';
import { Card } from '../../../../shared/components/card/card';
import { ConfirmationModalService } from '../../../../core/services/confirmation-modal.service';
import { CustomValidators } from '../../../../shared/utils/CustomValidators';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SaleService } from '../../../../core/services/sale.service';
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
  saleForm: FormGroup;
  saleItemForm: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 2;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private router: Router,
    private modalService: ConfirmationModalService,
    private layout: HomeLayout,
    private responseMessageService: ResponseMessageService,
  ) {
    this.saleForm = this.newSaleForm();
    this.saleItemForm = this.newSaleItemForm();
  }

  private newSaleForm(): FormGroup {
    return this.fb.group({
      customerName: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      itens: this.fb.array([]),
    });
  }

  private newSaleItemForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      id: ['', [Validators.required]],
      quantity: ['', [Validators.required, CustomValidators.quantity()]],
      price: ['', [Validators.required]],
    });
  }

  get itens(): FormArray {
    return this.saleForm.get('itens') as FormArray;
  }

  addItem(item: any) {
    this.itens.push(
      this.fb.group({
        name: [item.name, [Validators.required]],
        id: [item.id, [Validators.required]],
        quantity: [item.quantity, [Validators.required, CustomValidators.quantity()]],
        price: [item.price, [Validators.required]],
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

    console.log(this.saleForm.value);
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

        setTimeout(() => {
          this.navigate(`/sales/${response.content[0].id}`);
        }, 2000);
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
