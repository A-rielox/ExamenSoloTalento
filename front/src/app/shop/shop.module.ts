import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { AddShopComponent } from './add-shop/add-shop.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PrimeModule } from '../_prime/prime.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
   declarations: [ShopComponent, AddShopComponent],
   imports: [
      CommonModule,
      FormsModule,
      PrimeModule,
      ReactiveFormsModule,
      ButtonModule,
      SharedModule,
   ],
})
export class ShopModule {}
