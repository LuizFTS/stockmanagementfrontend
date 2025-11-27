import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../../../../shared/components/button/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Formatter } from '../../../../../shared/utils/Formatter';
import { ProductService } from '../../../../../core/services/api/product.service';
import { ConfirmationModalService } from '../../../../../core/services/confirmation-modal.service';

@Component({
  selector: 'stk-product-item',
  imports: [MatIcon, Button],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  @Input() id!: string;
  @Input() name!: string;
  @Input() description!: string;
  @Input() costPrice!: number;
  @Input() salePrice!: number;
  @Input() createdAt!: string;
  @Input() saldo!: number;
  @Input() active: boolean = true;

  @Input() index!: number;

  @Output() activeChange = new EventEmitter<void>();

  firstItem: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private modalService: ConfirmationModalService,
  ) {}

  ngOnChanges() {
    this.firstItem = this.index === 0;
  }

  formatValue(value: number): string {
    return Formatter.priceToString(value);
  }

  capitalize(str: string) {
    return Formatter.capitalize(str);
  }

  navigate() {
    this.router.navigate(['inventory', 'products', this.id]);
  }

  get itemActionFunction() {
    return this.active ? this.navigate : this.reactivateItem;
  }

  async reactivateItem() {
    const confirmed = await this.modalService.open({
      title: 'Confirmar reativação',
      message: 'Tem certeza que deseja reativar este produto?',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) return;
    this.productService.reactivate(this.id).subscribe({
      next: () => {
        this.active = true;

        this.activeChange.emit();
      },
    });
  }
}
