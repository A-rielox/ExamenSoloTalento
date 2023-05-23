import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { ShopComponent } from './shop/shop.component';
import { AddShopComponent } from './shop/add-shop/add-shop.component';
import { AuthGuard } from './_guards/auth.guard';
import { ArticuloTiendaComponent } from './articulo-tienda/articulo-tienda.component';
import { EnviarArticuloComponent } from './articulo-tienda/enviar-articulo/enviar-articulo.component';
import { StoreComponent } from './store/store.component';
import { ComprarArticulosComponent } from './store/comprar-articulos/comprar-articulos.component';

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
         { path: 'articulo-tienda', component: ArticuloTiendaComponent },
         {
            path: 'articulo-tienda/:tiendaId',
            component: EnviarArticuloComponent,
         },
         { path: 'comprar', component: StoreComponent },
         {
            path: 'comprar/:tiendaId',
            component: ComprarArticulosComponent,
         },
      ],
   },

   { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
