import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Button } from '../../../../../shared/components/button/button';
import { Formatter } from '../../../../../shared/utils/Formatter';
import { SupplierService } from '../../../../../core/services/api/supplier.service';
import { ConfirmationModalService } from '../../../../../core/services/confirmation-modal.service';
import { ResponseMessageService } from '../../../../../core/services/response-message.service';

@Component({
  selector: 'stk-supplier-item',
  imports: [MatIcon, Button],
  templateUrl: './supplier-item.html',
  styleUrl: './supplier-item.scss',
})
export class SupplierItem {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() taxId: string = '';
  @Input() phone: string = '';
  @Input() email: string = '';
  @Input() index: number = 0;
  @Input() active: boolean = true;

  @Output() activeChange = new EventEmitter<void>();

  firstItem: boolean = false;

  constructor(
    private router: Router,
    private modalService: ConfirmationModalService,
    private supplierService: SupplierService,
    private messageService: ResponseMessageService,
  ) {}

  ngOnChanges() {
    this.firstItem = this.index === 0;
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  capitalize(str: string) {
    return Formatter.capitalize(str);
  }

  formatTaxId(value: string) {
    return Formatter.taxId(value);
  }

  formatPhone(value: string) {
    return Formatter.phone(value);
  }

  async reactivateItem() {
    const confirmed = await this.modalService.open({
      title: 'Confirmar reativação',
      message: 'Tem certeza que deseja reativar este produto?',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) return;
    this.supplierService.reactivate(this.id).subscribe({
      next: () => {
        this.activeChange.emit();
      },
      error: () => {
        this.messageService.error('Erro ao reativar fornecedor');
      },
    });
  }
}
