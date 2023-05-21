import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleClassModule } from 'primeng/styleclass';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      StyleClassModule,
      ButtonModule,
      MenubarModule,
      MenuModule,
      DropdownModule,
      DialogModule,
      InputTextModule,
   ],
   exports: [
      StyleClassModule,
      ButtonModule,
      MenubarModule,
      MenuModule,
      DropdownModule,
      DialogModule,
      InputTextModule,
   ],
})
export class PrimeModule {}
