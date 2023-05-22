import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { AddItemComponent } from './items/add-item/add-item.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'articulos', component: ItemsComponent },
   { path: 'articulos/edit', component: AddItemComponent },
   { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
