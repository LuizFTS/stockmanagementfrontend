import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeLayoutService {
  private scrollTopSubject = new Subject<void>();
  scrollTop$ = this.scrollTopSubject.asObservable();

  triggerScrollTop() {
    this.scrollTopSubject.next();
  }
}
