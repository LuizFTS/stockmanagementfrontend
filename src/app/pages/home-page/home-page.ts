import { Component, type OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import type { User } from '../../core/models/User.model';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.$user.subscribe((user) => {
      this.user = user;
    });
  }
}
