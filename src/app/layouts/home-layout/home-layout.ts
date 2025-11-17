import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-home-layout',
  imports: [MatIconModule, RouterOutlet, Sidebar],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.scss',
})
export class HomeLayout {
  isSidebarOpen: boolean = false;

  toggleSidebar(event: boolean) {
    this.isSidebarOpen = event;
  }
}
