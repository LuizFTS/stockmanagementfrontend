import { Component, Input } from '@angular/core';

@Component({
  selector: 'stk-supplier-item',
  imports: [],
  templateUrl: './supplier-item.html',
  styleUrl: './supplier-item.scss',
})
export class SupplierItem {
  @Input() name: string = '';
  @Input() taxId: string = '';
  @Input() phone: string = '';
  @Input() email: string = '';
  @Input() index: number = 0;

  firstItem: boolean = false;

  ngOnChanges() {
    this.firstItem = this.index === 0;
  }
}
