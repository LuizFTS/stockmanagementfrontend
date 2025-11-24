import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Card } from '../../shared/components/card/card';

interface Menu {
  id: number;
  title: string;
  path: string;
  icon: string;
}

const MENU_PROFILE: Menu[] = [
  { id: 1, title: 'Informações gerais', path: '/profile/general', icon: 'person' },
  { id: 2, title: 'Alterar senha', path: '/profile/change-password', icon: 'key_vertical' },
];

@Component({
  selector: 'app-profile-page',
  imports: [MatIcon, RouterModule, Card],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  menuData: Menu[] = MENU_PROFILE;

  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
