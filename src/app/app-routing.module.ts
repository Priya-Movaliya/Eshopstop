import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CourierComponent } from './components/courier/courier.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { PartyComponent } from './components/party/party.component';
import { ProductComponent } from './components/product/product.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "forgotPassword", component: ForgotPasswordComponent },
  {
    path: "admin", component: AdminComponent,
    children: [
      { path: "", redirectTo: "party", pathMatch: "full" },
      { path: "product", component: ProductComponent },
      { path: "order", component: OrderComponent },
      { path: "party", component: PartyComponent },
      { path: "courier", component: CourierComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
