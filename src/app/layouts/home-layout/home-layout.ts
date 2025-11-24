import { Component, ViewChild, type ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-home-layout',
  imports: [MatIconModule, RouterOutlet, Sidebar, Button],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.scss',
})
export class HomeLayout {
  @ViewChild('mainContainer') mainContainer!: ElementRef<HTMLElement>;
  isSidebarOpen: boolean = false;

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
