import { Component, inject } from '@angular/core';
import { Stepper } from '../../../../shared/components/stepper/stepper';
import { SearchSupplierPurchaseStep } from '../search-supplier-purchase-step/search-supplier-purchase-step';
import { Card } from '../../../../shared/components/card/card';
import { AddItemsPurchaseStep } from '../add-items-purchase-step/add-items-purchase-step';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  type FormGroup,
  type FormArray,
} from '@angular/forms';
import { MessageNotificationComponent } from '../../../../shared/components/message-notification-component/message-notification-component';
import { Router } from '@angular/router';
import type { ResponseStatus } from '../../../../core/models/ResponseStatus.model';
import { PurchaseService } from '../../../../core/services/purchase.service';
import { CustomValidators } from '../../../../shared/utils/CustomValidators';
import type { AddPurchaseRequest } from '../../../../core/models/request/AddPurchaseRequest.model';
import { ConfirmationModalService } from '../../../../core/services/confirmation-modal.service';

interface PurchaseItem {
  id: string;
  name: string;
  quantity: string;
  price: number;
}

@Component({
  selector: 'app-new-purchase-page',
  imports: [
    Stepper,
    SearchSupplierPurchaseStep,
    Card,
    AddItemsPurchaseStep,
    ReactiveFormsModule,
    MessageNotificationComponent,
  ],
  templateUrl: './new-purchase-page.html',
  styleUrl: './new-purchase-page.scss',
})
export class NewPurchasePage {
  purchaseForm: FormGroup;
  purchaseItemForm: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 2;

  isLoading: boolean = false;
  messageDisplayed: ResponseStatus = { status: '', message: '' };

  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private router: Router,
    private modalService: ConfirmationModalService,
  ) {
    this.purchaseForm = this.newPurchaseForm();
    this.purchaseItemForm = this.newPurchaseItemForm();
  }

  private newPurchaseForm(): FormGroup {
    return this.fb.group({
      supplierTaxId: ['', [Validators.required, CustomValidators.cnpj()]],
      supplierId: ['', [Validators.required]],
      itens: this.fb.array([]),
    });
  }

  private newPurchaseItemForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      id: ['', [Validators.required]],
      quantity: ['', [Validators.required, CustomValidators.quantity()]],
      price: ['', [Validators.required]],
    });
  }

  get itens(): FormArray {
    return this.purchaseForm.get('itens') as FormArray;
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

  async onAddNewPurchase() {
    if (this.purchaseForm.invalid) return;

    const confirmed = await this.modalService.open({
      title: 'Confirmar compra',
      message: 'Tem certeza que deseja confirmar esta compra?',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) return;

    this.isLoading = true;

    console.log(this.purchaseForm.value);
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
        this.messageDisplayed = {
          status: 'success',
          message: 'Compra realizada!',
        };

        console.log(response);

        setTimeout(() => {
          this.navigate(`/purchases/${response.content[0].id}`);
        }, 2000);
        this.isLoading = false;
        this.showMessageHandle();
      },
      error: (err) => {
        this.messageDisplayed = {
          status: 'error',
          message: err.error.message ?? 'Tente novamente mais tarde',
        };
        this.isLoading = false;
        this.showMessageHandle();
      },
    });
  }

  showMessageHandle(message?: string, status?: string) {
    if (message && status) {
      this.messageDisplayed = { status, message };
    }
    setTimeout(() => {
      this.messageDisplayed = { status: '', message: '' };
    }, 5000);
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
