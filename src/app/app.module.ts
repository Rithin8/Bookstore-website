import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AccountComponent } from './account/account.component';
import { AppRoutingModule } from './app-routing.module';
import { CartService } from './services/cart.service';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { FilterPipe } from './admin-portal/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookService } from './services/book.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    AboutComponent,
    LoginRegisterComponent,
    AccountComponent,
    CartComponent,
    OrderTrackingComponent,
    AdminPortalComponent,
    BookListComponent,
    BookDetailsComponent,
    FilterPipe,
    CheckoutComponent,
    OrderConfirmComponent,

    
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule,HttpClientModule,ReactiveFormsModule],
  providers: [CartService,BookService ],
  bootstrap: [AppComponent],
})
export class AppModule {}

