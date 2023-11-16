import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './components/list-product/list-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
 
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  { path: 'product', component: ListProductComponent },
  { path: 'product/:id', component: EditProductComponent  },
  { path: 'add', component: AddProductComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
