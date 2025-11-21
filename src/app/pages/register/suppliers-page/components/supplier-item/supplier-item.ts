import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'stk-supplier-item',
  imports: [MatIcon],
  templateUrl: './supplier-item.html',
  styleUrl: './supplier-item.scss',
})
export class SupplierItem {
  private router = inject(Router);
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() taxId: string = '';
  @Input() phone: string = '';
  @Input() email: string = '';
  @Input() index: number = 0;

  firstItem: boolean = false;

  ngOnChanges() {
    this.firstItem = this.index === 0;
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }
}
