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
import { AddNewSupplierPage } from './pages/register/suppliers-page/components/add-new-supplier-page/add-new-supplier-page';
import { AddNewProductPage } from './pages/inventory/products-page/components/add-new-product-page/add-new-product-page';
import { UpdateSupplierPage } from './pages/register/suppliers-page/components/update-supplier-page/update-supplier-page';
import { AddNewCustomerPage } from './pages/register/customers-page/components/add-new-customer-page/add-new-customer-page';
import { UpdateCustomerPage } from './pages/register/customers-page/components/update-customer-page/update-customer-page';
import { UpdateProductPage } from './pages/inventory/products-page/components/update-product-page/update-product-page';
import { PurchasePage } from './pages/purchases/purchase-history-page/components/purchase-page/purchase-page';
import { SalePage } from './pages/sales/sale-history-page/components/sale-page/sale-page';

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
      { path: 'purchases/:id', component: PurchasePage },
      { path: 'sales/add', component: NewSalePage },
      { path: 'sales/history', component: SaleHistoryPage },
      { path: 'sales/:id', component: SalePage },
      { path: 'inventory/products', component: ProductsPage },
      { path: 'inventory/products/add', component: AddNewProductPage },
      { path: 'inventory/products/:id', component: UpdateProductPage },
      { path: 'inventory/movement', component: InventoryMovementPage },
      { path: 'customers', component: CustomersPage },
      { path: 'customers/add', component: AddNewCustomerPage },
      { path: 'customers/:id', component: UpdateCustomerPage },
      { path: 'suppliers', component: SuppliersPage },
      { path: 'suppliers/add', component: AddNewSupplierPage },
      { path: 'suppliers/:id', component: UpdateSupplierPage },
    ],
  },
  { path: '**', redirectTo: '/home' },
];
