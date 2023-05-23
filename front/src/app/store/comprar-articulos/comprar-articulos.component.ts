import { Component, OnInit } from '@angular/core';
import {
   FormBuilder,
   FormControl,
   FormGroup,
   Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticuloTiendaService } from 'src/app/articulo-tienda/articulo-tienda.service';
import { AccountService } from 'src/app/core/account.service';
import { ItemsService } from 'src/app/items/items.service';
import { Articulo } from 'src/app/shared/_models/articulo';
import { ArticuloCarrito } from 'src/app/shared/_models/articuloCarrito';
import { ArticuloEnTienda } from 'src/app/shared/_models/articuloEnTienda';
import { InfoTienda } from 'src/app/shared/_models/infoTienda';
import { User } from 'src/app/shared/_models/user';

@Component({
   selector: 'app-comprar-articulos',
   templateUrl: './comprar-articulos.component.html',
   styleUrls: ['./comprar-articulos.component.css'],
})
export class ComprarArticulosComponent implements OnInit {
   tienda: InfoTienda = {} as InfoTienda;
   articulosEnTienda: ArticuloEnTienda[] = [];
   articulos: Articulo[] = [];
   Forma: FormGroup = new FormGroup({});

   usuario?: User | null;

   carrito: ArticuloCarrito[] = [];

   constructor(
      private fb: FormBuilder,
      private articuloTiendaService: ArticuloTiendaService,
      private itemsService: ItemsService,
      private activatedRoute: ActivatedRoute,
      private accountService: AccountService
   ) {
      this.activatedRoute.params.subscribe({
         next: (res) => {
            this.tienda.tiendaId = res['tiendaId'];
         },
      });

      this.activatedRoute.queryParams.subscribe({
         next: (res) => {
            this.tienda.nombreSucursal = res['nombreSucursal'];
         },
      });

      this.articuloTiendaService.setChosenStore(
         this.tienda.tiendaId,
         this.tienda.nombreSucursal
      );

      // usuario
      this.accountService.currentUser$.subscribe({
         next: (res) => (this.usuario = res),
      });
   }

   ngOnInit(): void {
      this.initializeForm();

      this.loadArticles();
      this.loadArticulosTienda();
      // this.getTipos();
   }

   loadArticulosTienda() {
      this.articuloTiendaService.getArticulosEnTienda().subscribe({
         next: (res) => {
            this.articulosEnTienda = res;
         },
      });
   }

   loadArticles() {
      this.itemsService.getProducts().subscribe({
         next: (res) => {
            this.articulos = res;
         },
         error: (err) => console.log(err),
      });
   }

   initializeForm() {
      this.Forma = this.fb.group({
         anadirCantidad: [0, [Validators.required]],
      });
   }

   getPrice(articuloId: number) {
      if (!articuloId) return -1;

      let price = this.articulos.filter((ar) => ar.codigo === articuloId)[0]
         .precio;

      return price;
   }

   anadirArticulo(articulo: ArticuloEnTienda) {
      const { id: idTiendaArticulo, articuloId } = articulo;
      const quantityItemAdded = this.Forma.value['anadirCantidad'];
      const precio = this.getPrice(articuloId);
      const monto = precio * quantityItemAdded;

      let articuloFoto = this.articulos.filter(
         (ar) => ar.codigo === articulo.articuloId
      )[0].imagen;

      let newArticulo: ArticuloCarrito = {
         codigo: articuloId,
         descripcion: articulo.descripcion,
         precio,
         imagen: articuloFoto,
         cantidad: quantityItemAdded,
         tipo: articulo.tipo,
         monto,
      };

      this.carrito.push(newArticulo);

      console.log(this.carrito);
   }

   getSubtotal() {
      const suma = this.carrito.reduce((t, c) => t + c.precio * c.cantidad, 0);
      return suma;
   }

   getTax() {
      return this.getSubtotal() * 0.1;
   }

   getTotalCarrito() {
      return this.getSubtotal() + this.getTax();
   }
}
