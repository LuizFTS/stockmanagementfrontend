import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { ResponseStatus } from '../../../core/models/ResponseStatus.model';

@Component({
  selector: 'stk-message-notification',
  imports: [],
  templateUrl: './message-notification-component.html',
  styleUrl: './message-notification-component.scss',
})
export class MessageNotificationComponent {
  @Input() message: string = '';
  @Input() status: string = '';
  data: ResponseStatus = { status: '', message: '' };

  ngOnInit() {
    this.data = {
      message: this.message,
      status: this.status,
    };
  }
}
