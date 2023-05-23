import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { Tienda } from '../shared/_models/tienda';
import { Router } from '@angular/router';

@Component({
   selector: 'app-articulo-tienda',
   templateUrl: './articulo-tienda.component.html',
   styleUrls: ['./articulo-tienda.component.css'],
})
export class ArticuloTiendaComponent implements OnInit {
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
      this.router.navigate(['/articulo-tienda/', tiendaId], {
         queryParams: { nombreSucursal },
      });
   }
}
