import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponseMessageService {
  isOpen = signal(false);
  status = signal('');
  message = signal('');

  private open(status: string, message: string) {
    this.isOpen.set(true);
    this.status.set(status);
    this.message.set(message);

    setTimeout(() => {
      this.close();
    }, 5000);
  }

  success(text: string) {
    this.open('success', text);
  }

  error(text: string) {
    this.open('error', text);
  }

  close() {
    this.isOpen.set(false);
    this.status.set('');
    this.message.set('');
  }
}
