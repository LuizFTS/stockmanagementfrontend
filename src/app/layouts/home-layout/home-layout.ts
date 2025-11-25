import { Component, ViewChild, type ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Button } from '../../shared/components/button/button';
import type { Subscription } from 'rxjs';
import { MessageNotificationComponent } from '../../shared/components/message-notification-component/message-notification-component';
import { ResponseMessageService } from '../../core/services/response-message.service';
import { HomeLayoutService } from '../../core/services/home-layout.service';

@Component({
  selector: 'app-home-layout',
  imports: [MatIconModule, RouterOutlet, Sidebar, Button, MessageNotificationComponent],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.scss',
})
export class HomeLayout {
  @ViewChild('mainContainer') mainContainer!: ElementRef<HTMLElement>;
  private sub!: Subscription;
  isSidebarOpen: boolean = false;

  constructor(
    private homeLayoutService: HomeLayoutService,
    public responseMessageService: ResponseMessageService,
  ) {}

  ngOnInit() {
    this.sub = this.homeLayoutService.scrollTop$.subscribe(() => {
      this.scrollToTop();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  scrollToTop() {
    this.mainContainer.nativeElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  toggleSidebar(event: boolean) {
    this.isSidebarOpen = event;
  }
}
