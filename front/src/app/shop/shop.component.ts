import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Tienda } from '../shared/_models/tienda';
import { ShopService } from './shop.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
   selector: 'app-shop',
   templateUrl: './shop.component.html',
   styleUrls: ['./shop.component.css'],
   providers: [ConfirmationService],
})
export class ShopComponent implements OnInit {
   tiendas: Tienda[] = [];

   constructor(
      private shopService: ShopService,
      private confirmationService: ConfirmationService,
      private router: Router
   ) {}

   ngOnInit(): void {
      this.loadTiendas();
   }

   loadTiendas() {
      this.shopService.getTiendas().subscribe({
         next: (res) => {
            console.log(res);
            this.tiendas = res;
         },
         error: (err) => console.log(err),
      });
   }

   onEdit(tienda: Tienda) {
      const navigationExtras: NavigationExtras = {
         state: { tienda: tienda },
      };

      this.router.navigateByUrl('/tiendas/edit', navigationExtras);
   }

   confirm(event: Event, id: number) {
      if (!event.target) return;

      this.confirmationService.confirm({
         target: event.target,
         message: 'Confirma que desea borrar ?',
         acceptLabel: 'Borrar',
         rejectLabel: 'Cancelado',
         icon: 'pi pi-exclamation-triangle',

         accept: () => {
            if (!id) return;

            this.shopService.deleteTienda(id).subscribe({
               next: () => {
                  this.loadTiendas();
               },
            });
         },
         reject: () => {
            console.log('cancelar');
         },
      });
   }
}
