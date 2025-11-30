import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Button } from '../../../../../shared/components/button/button';
import { Router } from '@angular/router';
import { Formatter } from '../../../../../shared/utils/Formatter';
import { ConfirmationModalService } from '../../../../../core/services/confirmation-modal.service';
import { CustomerService } from '../../../../../core/services/api/customer.service';
import { ResponseMessageService } from '../../../../../core/services/response-message.service';

@Component({
  selector: 'stk-customer-item',
  imports: [MatIcon, Button],
  templateUrl: './customer-item.html',
  styleUrl: './customer-item.scss',
})
export class CustomerItem {
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
    private customerService: CustomerService,
    private messageService: ResponseMessageService,
  ) {}

  ngOnChanges() {
    this.firstItem = this.index === 0;
  }

  async reactivateItem() {
    const confirmed = await this.modalService.open({
      title: 'Confirmar reativação',
      message: 'Tem certeza que deseja reativar este cliente?',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) return;
    this.customerService.reactivate(this.id).subscribe({
      next: () => {
        this.activeChange.emit();
      },
      error: () => {
        this.messageService.error('Erro ao reativar cliente');
      },
    });
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
}
