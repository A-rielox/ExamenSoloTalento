import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { PrimeModule } from './_prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { StoreModule } from './store/store.module';
import { ItemsModule } from './items/items.module';
import { HomeModule } from './home/home.module';
import { ShopModule } from './shop/shop.module';
import { ArticuloTiendaModule } from './articulo-tienda/articulo-tienda.module';

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      PrimeModule,
      FormsModule,
      ReactiveFormsModule,
      CoreModule,
      StoreModule,
      ItemsModule,
      ShopModule,
      HomeModule,
      ArticuloTiendaModule,
   ],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
