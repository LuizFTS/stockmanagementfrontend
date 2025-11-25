import { Component, Input, type SimpleChanges } from '@angular/core';
import { HomeLayoutService } from '../../../core/services/home-layout.service';

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

  constructor(private layoutService: HomeLayoutService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.shouldRender = true;
        this.layoutService.triggerScrollTop();

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
