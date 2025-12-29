import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';
import { CheckoutComponent } from './features/checkout/checkout/checkout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { StorePageComponent } from './features/store/store-page/store-page.component';
import { StoreOwnerLoginComponent } from './features/store/store-owner-login/store-owner-login.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'stores/:slug', component: StorePageComponent },
  { path: 'store-owner/login', component: StoreOwnerLoginComponent },
  { path: '**', redirectTo: '' }
];
