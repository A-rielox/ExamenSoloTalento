import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tienda } from 'src/app/shared/_models/tienda';
import { ShopService } from '../shop.service';
import { EditTienda } from 'src/app/shared/_models/editTienda';
import { NewTienda } from 'src/app/shared/_models/newTienda';

@Component({
   selector: 'app-add-shop',
   templateUrl: './add-shop.component.html',
   styleUrls: ['./add-shop.component.css'],
})
export class AddShopComponent implements OnInit {
   title?: string;
   tiendaToEdit?: Tienda;
   edit?: boolean;

   ////////
   componentMode: string = 'New';
   TiendasForm: FormGroup = new FormGroup({});

   constructor(
      private fb: FormBuilder,
      private router: Router,
      private shopService: ShopService
   ) {
      const navigation = this.router.getCurrentNavigation();
      this.tiendaToEdit = navigation?.extras.state?.['tienda'];
      console.log(this.tiendaToEdit);

      this.edit = this.tiendaToEdit ? true : false;

      if (this.tiendaToEdit) {
         this.title = 'Editar Tienda';
      } else {
         this.title = 'Añadir Tienda';
      }
   }

   ngOnInit(): void {
      this.initializeForm();

      //          edicion
      if (this.tiendaToEdit) {
         this.componentMode = 'Edit';

         const { id, sucursal, direccion } = this.tiendaToEdit;

         this.TiendasForm.setValue({
            id,
            sucursal,
            direccion,
         });
      }
   }

   initializeForm() {
      this.TiendasForm = this.fb.group({
         id: [-1, Validators.required],
         sucursal: ['', [Validators.required]],
         direccion: ['', Validators.required],
      });
   }

   sendTienda() {
      const { id, sucursal, direccion } = this.TiendasForm.value;

      if (!sucursal || !direccion) return;

      if (this.componentMode === 'New') {
         // prettier-ignore
         const newTienda: NewTienda = {
            sucursal, direccion
         };

         this.shopService.addTienda(newTienda).subscribe({
            next: () => {
               this.TiendasForm.reset();
               this.router.navigateByUrl('/tiendas');
            },
         });
      } else if (this.componentMode === 'Edit') {
         // prettier-ignore
         const editTienda: EditTienda = {
            id, sucursal, direccion
         };

         this.shopService.editTienda(editTienda).subscribe({
            next: () => {
               this.TiendasForm.reset();
               this.router.navigateByUrl('/tiendas');
            },
         });
      }
   }
}
