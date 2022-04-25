import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AdminComponent } from './admin/admin.component';
import { MatIconModule } from '@angular/material/icon';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpServiceService } from './services/http-service.service';
import { CacheInterceptor } from './interceptor/cache.interceptor';
import { OrderComponent } from './components/order/order.component';
import { CourierComponent } from './components/courier/courier.component';
import { ProductComponent } from './components/product/product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormdilogComponent } from './components/party/formdilog/formdilog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ProductformComponent } from './components/product/productform/productform.component';
import { OrderformComponent } from './components/order/orderform/orderform.component';
import { PurchaseComponent } from './components/order/purchase/purchase.component';
import { SellComponent } from './components/order/sell/sell.component';
import { CourierformComponent } from './components/courier/courierform/courierform.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewProductComponent } from './components/product/view-product/view-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { MatChipsModule } from '@angular/material/chips';
import { UpdateorderComponent } from './components/order/updateorder/updateorder.component';
import { VieworderComponent } from './components/order/vieworder/vieworder.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewcourierComponent } from './components/courier/viewcourier/viewcourier.component';
import { UpdatecourierComponent } from './components/courier/updatecourier/updatecourier.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PartyComponent } from './components/party/party.component';
import { ViewformComponent } from './components/party/viewform/viewform.component';
import { UpdateformComponent } from './components/party/updateform/updateform.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { UpdatePurchaseComponent } from './components/order/update-purchase/update-purchase.component';
import { UpdateSellComponent } from './components/order/update-sell/update-sell.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AdminComponent,
    ForgotPasswordComponent,
    OrderComponent,
    CourierComponent,
    ProductComponent,
    DashboardComponent,
    FormdilogComponent,
    ProductformComponent,
    OrderformComponent,
    PurchaseComponent,
    SellComponent,
    CourierformComponent,
    SidebarComponent,
    ViewformComponent,
    UpdateProductComponent,
    PartyComponent,
    ViewformComponent,
    UpdateformComponent,
    FormdilogComponent,
    UpdateorderComponent,
    VieworderComponent,
    ViewProductComponent,
    ViewcourierComponent,
    UpdatecourierComponent,
    UpdatePurchaseComponent,
    UpdateSellComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexModule,
    MatCardModule,
    MatDatepickerModule,
    FlexLayoutModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule

  ],

  providers: [HttpServiceService, { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }],

  bootstrap: [AppComponent]
})
export class AppModule { }
