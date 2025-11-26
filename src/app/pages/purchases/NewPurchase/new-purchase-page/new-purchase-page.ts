import { Component, inject } from '@angular/core';
import { Stepper } from '../../../../shared/components/stepper/stepper';
import { SearchSupplierPurchaseStep } from '../search-supplier-purchase-step/search-supplier-purchase-step';
import { Card } from '../../../../shared/components/card/card';
import { AddItemsPurchaseStep } from '../add-items-purchase-step/add-items-purchase-step';
import {
  FormArray,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseService } from '../../../../core/services/api/purchase.service';
import { CustomValidators } from '../../../../shared/utils/CustomValidators';
import type { AddPurchaseRequest } from '../../../../core/models/request/AddPurchaseRequest.model';
import { ConfirmationModalService } from '../../../../core/services/confirmation-modal.service';
import { HomeLayout } from '../../../../layouts/home-layout/home-layout';
import { ResponseMessageService } from '../../../../core/services/response-message.service';

export interface PurchaseItem {
  id: string;
  name: string;
  quantity: string;
  price: number;
}

@Component({
  selector: 'app-new-purchase-page',
  imports: [Stepper, SearchSupplierPurchaseStep, Card, AddItemsPurchaseStep, ReactiveFormsModule],
  templateUrl: './new-purchase-page.html',
  styleUrl: './new-purchase-page.scss',
})
export class NewPurchasePage {
  purchaseForm: FormGroup = new FormGroup({
    supplierName: new FormControl<string>('', { validators: Validators.required }),
    supplierId: new FormControl<string>('', { validators: Validators.required }),
    itens: new FormArray([]),
  });

  purchaseItemForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', { validators: Validators.required }),
    id: new FormControl<string>('', { validators: Validators.required }),
    quantity: new FormControl<string>('', { validators: Validators.required }),
    price: new FormControl<string>('', { validators: Validators.required }),
  });

  currentStep: number = 1;
  totalSteps: number = 2;

  isLoading: boolean = false;

  constructor(
    private purchaseService: PurchaseService,
    private router: Router,
    private modalService: ConfirmationModalService,
    private layout: HomeLayout,
    private responseMessageService: ResponseMessageService,
  ) {}

  get itens(): FormArray {
    return this.purchaseForm.get('itens') as FormArray;
  }

  addItem(item: any) {
    this.itens.push(
      new FormGroup({
        name: new FormControl<string>(item.name, { validators: Validators.required }),
        id: new FormControl<string>(item.id, { validators: Validators.required }),
        quantity: new FormControl<string>(item.quantity, { validators: Validators.required }),
        price: new FormControl<string>(item.price, { validators: Validators.required }),
      }),
    );
  }

  removeItem(index: number) {
    this.itens.removeAt(index);
  }

  async onAddNewPurchase() {
    console.log(this.purchaseForm.value);
    if (this.purchaseForm.invalid) return;

    const confirmed = await this.modalService.open({
      title: 'Confirmar compra',
      message: 'Tem certeza que deseja confirmar esta compra?',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) return;

    this.isLoading = true;

    const formValue = this.purchaseForm.value;

    const payload: AddPurchaseRequest = {
      supplierId: formValue.supplierId,
      itens: formValue.itens.map((item: PurchaseItem) => ({
        productId: item.id,
        quantity: parseInt(item.quantity),
      })),
    };

    this.purchaseService.create(payload).subscribe({
      next: (response) => {
        this.responseMessageService.success('Compra realizada!');

        this.layout.scrollToTop();

        this.navigate(`/purchases/${response.content[0].id}`);
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
