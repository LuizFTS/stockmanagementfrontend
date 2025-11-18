import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stk-itens-not-found',
  imports: [MatIcon],
  templateUrl: './itens-not-found.html',
  styleUrl: './itens-not-found.scss',
})
export class ItensNotFound {
  @Input() text: string = '';
}
