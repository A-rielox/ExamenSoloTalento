import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { PrimeModule } from '../_prime/prime.module';
import { FormsModule } from '@angular/forms';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { RouterModule } from '@angular/router';

@NgModule({
   declarations: [NavbarComponent, ModalLoginComponent],
   imports: [CommonModule, PrimeModule, FormsModule, RouterModule],
   exports: [NavbarComponent],
})
export class CoreModule {}
