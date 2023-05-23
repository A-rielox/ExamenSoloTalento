import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/items/items.service';
import { Articulo } from 'src/app/shared/_models/articulo';
import { ArticuloEnTienda } from 'src/app/shared/_models/articuloEnTienda';
import { ArticuloTiendaService } from '../articulo-tienda.service';
// prettier-ignore
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InfoTienda } from 'src/app/shared/_models/infoTienda';
import { Tipos } from 'src/app/shared/_models/tipos';

@Component({
   selector: 'app-enviar-articulo',
   templateUrl: './enviar-articulo.component.html',
   styleUrls: ['./enviar-articulo.component.css'],
})
export class EnviarArticuloComponent implements OnInit {
   articulos: Articulo[] = [];
   articulosIds: number[] = [];
   articulosEnTienda: ArticuloEnTienda[] = [];
   articulosEnTiendaIds: number[] = [];
   value: number = 0;
   tipos: Tipos[] = [];

   tienda: InfoTienda = {} as InfoTienda;

   Forma: FormGroup = new FormGroup({});

   constructor(
      private fb: FormBuilder,
      private articuloTiendaService: ArticuloTiendaService,
      private itemsService: ItemsService,
      private activatedRoute: ActivatedRoute
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
   }

   ngOnInit(): void {
      this.initializeForm();

      this.loadArticles();
      this.loadArticulosTienda();
      this.getTipos();
   }

   initializeForm() {
      this.Forma = this.fb.group({
         stock: [10, [Validators.required]],
      });
   }

   valor(articuloCodigo: number) {
      let stockEnTienda = this.articulosEnTienda.filter(
         (ar) => ar.articuloId === articuloCodigo
      )[0].stock;

      return new FormControl(stockEnTienda);
   }

   loadArticles() {
      this.itemsService.getProducts().subscribe({
         next: (res) => {
            this.articulos = res;
            this.articulosIds = this.articulos.map((el) => el.codigo);
         },
         error: (err) => console.log(err),
      });
   }

   loadArticulosTienda() {
      this.articuloTiendaService.getArticulosEnTienda().subscribe({
         next: (res) => {
            this.articulosEnTienda = res;
            this.articulosEnTiendaIds = this.articulosEnTienda.map(
               (el) => el.articuloId
            );
         },
      });
   }

   isInStock(articuloId: number) {
      return this.articulosEnTiendaIds.includes(articuloId);
   }

   getTipos() {
      this.articuloTiendaService.getTiposArt().subscribe({
         next: (res) => (this.tipos = res),
      });
   }

   //añadir a tienda
   anadir(articulo: Articulo) {
      const { codigo: articuloId, tipo } = articulo;

      let tipoId = this.tipos.filter((ti) => ti.name === articulo.tipo)[0].id;

      // prettier-ignore
      let artToAdd = { articuloId, tipo, tipoId, tiendaId: this.tienda.tiendaId, nombreSucursal: this.tienda.nombreSucursal, stockAdded: 1 };

      this.articuloTiendaService.anadirArticulo(artToAdd).subscribe({
         next: () => {
            this.loadArticles();
            this.loadArticulosTienda();
         },
      });
   }

   quitar(articulo: Articulo) {
      let idTiendaArticulo = this.articulosEnTienda.filter(
         (ar) => ar.articuloId === articulo.codigo
      )[0].id;

      this.articuloTiendaService.quitarArticulo(idTiendaArticulo).subscribe({
         next: () => {
            this.loadArticles();
            this.loadArticulosTienda();
         },
      });
   }

   onInput(event: any) {
      this.value = event;
   }

   ajustarArticulo(articulo: Articulo) {
      let tiendaArticulo = this.articulosEnTienda.filter(
         (ar) => ar.articuloId === articulo.codigo
      )[0];

      const stockFinal = this.value;
      const { stock: stockInicial, articuloId } = tiendaArticulo;

      const updateObj = {
         tiendaArticuloId: tiendaArticulo.id,
         stockInicial,
         stockFinal,
         articuloId,
      };

      this.articuloTiendaService.updateArticulo(updateObj).subscribe({
         next: () => {
            this.loadArticles();
            this.loadArticulosTienda();
         },
      });
   }
}
