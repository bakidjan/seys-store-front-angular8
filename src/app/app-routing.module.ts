import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {LoginComponent} from './login/login.component';
import {ProductDetailsComponent} from './product-details/product-details.component';


const routes: Routes = [
  {path: 'selectedProducts/:p1/:p2', component: ProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'product-details/:url', component: ProductDetailsComponent},
  {path: '', redirectTo: '/selectedProducts/1/0', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
