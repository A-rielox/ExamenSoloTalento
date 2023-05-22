import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PrimeModule } from '../_prime/prime.module';
import { ModalRegistroComponent } from './modal-registro/modal-registro.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';

@NgModule({
   declarations: [HomeComponent, ModalRegistroComponent],
   imports: [
      CommonModule,
      PrimeModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
      ButtonModule,
   ],
   exports: [HomeComponent],
})
export class HomeModule {}
