import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloTiendaComponent } from './articulo-tienda.component';
import { EnviarArticuloComponent } from './enviar-articulo/enviar-articulo.component';
import { PrimeModule } from '../_prime/prime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
   declarations: [ArticuloTiendaComponent, EnviarArticuloComponent],
   imports: [CommonModule, PrimeModule, SharedModule, ReactiveFormsModule],
   exports: [],
})
export class ArticuloTiendaModule {}
