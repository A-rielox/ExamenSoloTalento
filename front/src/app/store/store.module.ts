import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { PrimeModule } from '../_prime/prime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ComprarArticulosComponent } from './comprar-articulos/comprar-articulos.component';

@NgModule({
   declarations: [StoreComponent, ComprarArticulosComponent],
   imports: [CommonModule, PrimeModule, SharedModule, ReactiveFormsModule],
   exports: [StoreComponent],
})
export class StoreModule {}
