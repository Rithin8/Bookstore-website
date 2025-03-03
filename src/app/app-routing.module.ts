import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { AuthGuard } from './guards/auth.guard';

// Routes
const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent }, // Default route
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginRegisterComponent, },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  {path: 'book/:id', component: BookDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
{ path: 'order-confirm', component: OrderConfirmComponent },
{ 
  path: 'admin', 
  component: AdminPortalComponent, 
  canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}