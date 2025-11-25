import { Component, Input, type SimpleChanges } from '@angular/core';
import { HomeLayout } from '../../../layouts/home-layout/home-layout';

@Component({
  selector: 'stk-message-notification',
  imports: [],
  templateUrl: './message-notification-component.html',
  styleUrl: './message-notification-component.scss',
})
export class MessageNotificationComponent {
  @Input() isOpen = false;
  @Input() message: string = '';
  @Input() status: string = '';

  shouldRender = false;
  isAnimating = false;

  constructor(private layout: HomeLayout) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.shouldRender = true;
        this.layout.scrollToTop();

        setTimeout(() => {
          this.isAnimating = true;
        }, 10);
      } else {
        this.isAnimating = false;
        this.shouldRender = false;
      }
    }
  }
}
