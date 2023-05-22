import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PrimeModule } from '../_prime/prime.module';
import { AddItemComponent } from './add-item/add-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
   declarations: [ItemsComponent, AddItemComponent],
   imports: [
      CommonModule,
      FormsModule,
      PrimeModule,
      ReactiveFormsModule,
      ButtonModule,
      SharedModule,
   ],
   exports: [ItemsComponent],
})
export class ItemsModule {}
