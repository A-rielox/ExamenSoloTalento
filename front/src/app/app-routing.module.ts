import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { ShopComponent } from './shop/shop.component';
import { AddShopComponent } from './shop/add-shop/add-shop.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
   { path: '', component: HomeComponent },
   {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
         { path: 'articulos', component: ItemsComponent },
         { path: 'articulos/edit', component: AddItemComponent },
         { path: 'tiendas', component: ShopComponent },
         { path: 'tiendas/edit', component: AddShopComponent },
      ],
   },

   { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
