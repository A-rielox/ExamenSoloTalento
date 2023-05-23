import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloEnTienda } from '../shared/_models/articuloEnTienda';
import { Tipos } from '../shared/_models/tipos';
import { ArticuloAnadir } from '../shared/_models/articuloAnadir';
import { UpdateArticulo } from '../shared/_models/articuloUpdate';

@Injectable({
   providedIn: 'root',
})
export class ArticuloTiendaService {
   baseUrl = 'https://localhost:5001/api/';
   chosenTiendaId?: number;
   chosenNombreSucursal?: string;

   constructor(private http: HttpClient) {}

   setChosenStore(tiendaId: number, nombreSucursal: string) {
      this.chosenTiendaId = tiendaId;
      this.chosenNombreSucursal = nombreSucursal;
   }

   getArticulosEnTienda() {
      return this.http.get<ArticuloEnTienda[]>(
         this.baseUrl + 'tiendaArticulo/' + this.chosenTiendaId
      );
   }

   getTiposArt() {
      return this.http.get<Tipos[]>(this.baseUrl + 'articulos/tipos');
   }

   anadirArticulo(anadirArt: ArticuloAnadir) {
      return this.http.post(this.baseUrl + 'tiendaArticulo', anadirArt);
   }

   quitarArticulo(idTiendaArticulo: number) {
      return this.http.delete(
         this.baseUrl + 'tiendaArticulo/' + idTiendaArticulo
      );
   }

   // /api/tiendaArticulo
   updateArticulo(updateObj: UpdateArticulo) {
      return this.http.put(this.baseUrl + 'tiendaArticulo', updateObj);
   }
}
