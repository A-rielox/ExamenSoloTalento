import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleClassModule } from 'primeng/styleclass';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { TableModule } from 'primeng/table';

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
      MultiSelectModule,
      InputTextareaModule,
      InputNumberModule,
      ConfirmPopupModule,
      TableModule,
   ],
   exports: [
      StyleClassModule,
      ButtonModule,
      MenubarModule,
      MenuModule,
      DropdownModule,
      DialogModule,
      InputTextModule,
      MultiSelectModule,
      InputTextareaModule,
      InputNumberModule,
      ConfirmPopupModule,
      TableModule,
   ],
})
export class PrimeModule {}
