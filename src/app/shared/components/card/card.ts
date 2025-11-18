import { Component, Input } from '@angular/core';

enum Padding {
  NONE,
  SM,
  MD,
  LG,
}

@Component({
  selector: 'stk-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() padding: Padding = Padding.NONE;
}
