import { Routes } from '@angular/router';
import { HomeLayout } from './layouts/home-layout/home-layout';
import { LoginPage } from './pages/auth/login-page/login-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { HomePage } from './pages/home-page/home-page';
import { NewPurchasePage } from './pages/purchases/new-purchase-page/new-purchase-page';
import { PurchaseHistoryPage } from './pages/purchases/purchase-history-page/purchase-history-page';
import { NewSalePage } from './pages/sales/new-sale-page/new-sale-page';
import { SaleHistoryPage } from './pages/sales/sale-history-page/sale-history-page';
import { ProductsPage } from './pages/inventory/products-page/products-page';
import { InventoryMovementPage } from './pages/inventory/inventory-movement-page/inventory-movement-page';
import { CustomersPage } from './pages/register/customers-page/customers-page';
import { SuppliersPage } from './pages/register/suppliers-page/suppliers-page';
import { GeneralInformationPage } from './pages/profile-page/general-information-page/general-information-page';
import { ChangePasswordPage } from './pages/profile-page/change-password-page/change-password-page';
import { RegisterPage } from './pages/auth/register-page/register-page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  {
    path: '',
    component: HomeLayout,
    children: [
      { path: 'home', component: HomePage },
      { path: 'profile', component: ProfilePage },
      { path: 'profile/general', component: GeneralInformationPage },
      { path: 'profile/change-password', component: ChangePasswordPage },
      { path: 'purchases/add', component: NewPurchasePage },
      { path: 'purchases/history', component: PurchaseHistoryPage },
      { path: 'sales/add', component: NewSalePage },
      { path: 'sales/history', component: SaleHistoryPage },
      { path: 'inventory/products', component: ProductsPage },
      { path: 'inventory/movement', component: InventoryMovementPage },
      { path: 'register/customers', component: CustomersPage },
      { path: 'register/suppliers', component: SuppliersPage },
    ],
  },
  { path: '**', redirectTo: '/' },
];
