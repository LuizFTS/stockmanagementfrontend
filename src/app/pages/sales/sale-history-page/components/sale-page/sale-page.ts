import { Component, inject } from '@angular/core';
import { Card } from '../../../../../shared/components/card/card';
import { BackButton } from '../../../../../shared/components/back-button/back-button';
import { Formatter } from '../../../../../shared/utils/Formatter';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../../../../../core/services/api/sale.service';
import type { Sale } from '../../../../../core/models/Sale.model';
import { ItemSkeleton } from '../../../../../shared/components/skeleton/item-skeleton/item-skeleton';
import { ResponseMessageService } from '../../../../../core/services/response-message.service';

@Component({
  selector: 'app-sale-page',
  imports: [Card, BackButton, ItemSkeleton],
  templateUrl: './sale-page.html',
  styleUrl: './sale-page.scss',
})
export class SalePage {
  id: string = '';
  sale: Sale | null = null;

  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private saleService: SaleService,
    private router: Router,
    private messageService: ResponseMessageService,
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.saleService.get(0, 1, { id: this.id }).subscribe({
      next: (response) => {
        const sale = response.content[0];
        this.sale = sale;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.messageService.error('Erro ao buscar venda');
      },
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  formatDate(date: string) {
    return Formatter.date(date);
  }

  formatValue(value: number) {
    return Formatter.priceToString(value);
  }

  capitalize(text: string) {
    return Formatter.capitalize(text);
  }
}
