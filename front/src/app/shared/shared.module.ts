import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from '../_prime/prime.module';
import { NumInputComponent } from './num-input/num-input.component';

@NgModule({
   declarations: [TextInputComponent, NumInputComponent],
   imports: [CommonModule, ReactiveFormsModule, PrimeModule],
   exports: [TextInputComponent, NumInputComponent],
})
export class SharedModule {}
