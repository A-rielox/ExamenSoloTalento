import { Component, OnInit } from '@angular/core';
import { Articulo } from '../shared/_models/articulo';
import { StoreService } from './store.service';

@Component({
   selector: 'app-store',
   templateUrl: './store.component.html',
   styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
   articulos: Articulo[] = [];

   constructor(private storeService: StoreService) {}

   ngOnInit(): void {
      this.storeService.getProducts().subscribe({
         next: (res) => (this.articulos = res),
         error: (err) => console.log(err),
      });
   }
}

// codigo: 1
// descripcion: "Pantalón a la moda color azul."
// imagen: ""
// precio: 200
// stock: 100
// tipo: "Pantalón"
