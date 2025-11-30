import { Component, Input } from '@angular/core';

@Component({
  selector: 'stk-item-skeleton',
  imports: [],
  templateUrl: './item-skeleton.html',
  styleUrl: './item-skeleton.scss',
})
export class ItemSkeleton {
  @Input() index: number = 0;
}
