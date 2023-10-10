import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {IndexComponent} from './index/index.component';
import { ProductDetailComponent} from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { AdminCRUDComponent} from './admin-crud/admin-crud.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';


const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'list-product', component: ListProductComponent },
  {path: 'index', component: IndexComponent},
  {path: '', component: IndexComponent},
  {path:'product-detail',component:ProductDetailComponent },
  {path:'product-detail/:id',component:ProductDetailComponent },
  {path:'login',component:LoginComponent},
  {path:'crear',component:CreateProductComponent},
  {path:'admin',component:AdminCRUDComponent},
  {path:'actualizar/:id',component:CreateProductComponent},
  {path:'carrito',component:CarritoComprasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
