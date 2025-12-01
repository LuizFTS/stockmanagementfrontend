import {
  Component,
  DestroyRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  ViewChild,
  type ElementRef,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SideBarMenuOption } from '../sidebar-menu-option/sidebar-menu-option';
import { UserService } from '../../../../core/services/api/user.service';
import { AuthService } from '../../../../core/services/api/auth.service';
import { SidebarMenuSubOption } from '../sidebar-menu-sub-option/sidebar-menu-sub-option';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface MenuItem {
  label: string;
  path: string;
}

interface MenuSection {
  id: string;
  label: string;
  icon: string;
  items: MenuItem[];
}

interface MenuState {
  activeSection: number | null;
  showingSection: number | null;
}

const MENU_CONFIG: MenuSection[] = [
  { id: 'home', label: 'Inicio', items: [], icon: 'home' },
  {
    id: 'purchases',
    label: 'Compras',
    items: [
      { label: 'Adicionar compra', path: '/purchases/add' },
      { label: 'Histórico de compras', path: '/purchases/history' },
    ],
    icon: 'shopping_cart',
  },
  {
    id: 'sales',
    label: 'Vendas',
    items: [
      { label: 'Adicionar venda', path: '/sales/add' },
      { label: 'Histórico de vendas', path: '/sales/history' },
    ],
    icon: 'paid',
  },
  {
    id: 'inventory',
    label: 'Estoque',
    items: [
      { label: 'Produtos', path: '/inventory/products' },
      { label: 'Movimentação do estoque', path: '/inventory/movement' },
    ],
    icon: 'inventory_2',
  },
  {
    id: 'registration',
    label: 'Cadastro',
    items: [
      { label: 'Clientes', path: '/customers' },
      { label: 'Fornecedores', path: '/suppliers' },
    ],
    icon: 'note_alt',
  },
];

const SPECIAL_ROUTES = {
  HOME: '/home',
  PROFILE: '/profile',
} as const;

const MOBILE_BREAKPOINT = 1024;

@Component({
  selector: 'stk-sidebar',
  imports: [RouterModule, SideBarMenuOption, SidebarMenuSubOption],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @ViewChild('floatMenuRef') floatMenuRef: ElementRef | null = null;
  @ViewChild('navRef') navRef!: ElementRef;
  @Input() active: boolean = false;
  @Output() opened = new EventEmitter<boolean>();

  readonly menuData = MENU_CONFIG;
  menuState: MenuState = {
    activeSection: null,
    showingSection: null,
  };
  userName = '';

  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadUserData();
  }

  toggleSidebar(isOpen: boolean): void {
    this.opened.emit(isOpen);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.floatMenuRef) return;

    if (
      !this.floatMenuRef.nativeElement.contains(event.target) &&
      !this.navRef.nativeElement.contains(event.target)
    ) {
      this.menuState.showingSection = null;
    }
  }

  handleSectionClick(index: number): void {
    const shouldAutoClose = this.isMobileView();
    const { activeSection, showingSection } = this.menuState;

    // Navega para rotas especiais
    if (this.isSpecialRoute(index)) {
      this.menuState.showingSection = null;
      this.menuState.activeSection = index;
      this.navigateToSpecialRoute(index);
      if (shouldAutoClose) {
        this.toggleSidebar(false);
      }
      return;
    }
    console.log(this.menuState);

    const isSameAsActive = activeSection === index;
    const isSameAsShowing = showingSection === index;

    if (isSameAsActive && isSameAsShowing) {
      this.menuState.showingSection = null;
      return;
    }
    if (isSameAsActive && !isSameAsShowing) {
      this.menuState.showingSection = index;
      return;
    }

    this.menuState.activeSection = index;
    this.menuState.showingSection = index;
  }

  handleItemClick(): void {
    if (!this.active) {
      this.menuState.showingSection = null;
    }

    // Fecha sidebar em mobile após navegação
    if (this.isMobileView()) {
      this.toggleSidebar(false);
    }
  }

  logout() {
    this.authService.logout();
  }

  isSectionActive(index: number): boolean {
    return this.menuState.activeSection === index;
  }

  isSectionShowing(index: number): boolean {
    return this.menuState.showingSection === index;
  }

  isHomeSection(section: MenuSection): boolean {
    return section.id === 'home';
  }

  hasArrow(section: MenuSection): boolean {
    return !this.isHomeSection(section);
  }

  private loadUserData(): void {
    this.userService
      .getUserFullName()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((fullname) => {
        this.userName = fullname ?? '';
      });
  }

  private isSpecialRoute(index: number): boolean {
    return index === 0 || index === -1;
  }

  private navigateToSpecialRoute(index: number): void {
    const route = index === -1 ? SPECIAL_ROUTES.PROFILE : SPECIAL_ROUTES.HOME;
    this.router.navigate([route]);
  }

  private isMobileView(): boolean {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }
}
