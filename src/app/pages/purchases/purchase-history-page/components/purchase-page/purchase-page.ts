import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Purchase } from '../../../../../core/models/Purchase.model';
import { PurchaseService } from '../../../../../core/services/api/purchase.service';
import { Formatter } from '../../../../../shared/utils/Formatter';
import { Card } from '../../../../../shared/components/card/card';
import { BackButton } from '../../../../../shared/components/back-button/back-button';

@Component({
  selector: 'app-purchase-page',
  imports: [Card, BackButton],
  templateUrl: './purchase-page.html',
  styleUrl: './purchase-page.scss',
})
export class PurchasePage {
  id: string = '';
  purchase: Purchase | null = null;

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private router: Router,
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.purchaseService.get(0, 1, { id: this.id }).subscribe({
      next: (response) => {
        const purchase = response.content[0];
        this.purchase = purchase;
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
