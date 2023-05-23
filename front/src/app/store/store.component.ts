import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { Router } from '@angular/router';
import { Tienda } from '../shared/_models/tienda';

@Component({
   selector: 'app-store',
   templateUrl: './store.component.html',
   styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
   tiendas: Tienda[] = [];

   constructor(private shopService: ShopService, private router: Router) {}

   ngOnInit(): void {
      this.loadTiendas();
   }

   loadTiendas() {
      this.shopService.getTiendas().subscribe({
         next: (res) => {
            this.tiendas = res;
         },
         error: (err) => console.log(err),
      });
   }

   goToTienda(tiendaId: number, nombreSucursal: string) {
      this.router.navigate(['/comprar/', tiendaId], {
         queryParams: { nombreSucursal },
      });
   }
}
