import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tienda } from '../shared/_models/tienda';
import { NewTienda } from '../shared/_models/newTienda';
import { EditTienda } from '../shared/_models/editTienda';

@Injectable({
   providedIn: 'root',
})
export class ShopService {
   baseUrl = 'https://localhost:5001/api/';

   constructor(private http: HttpClient) {}

   getTiendas() {
      return this.http.get<Tienda[]>(this.baseUrl + 'tiendas');
   }

   addTienda(newTienda: NewTienda) {
      return this.http.post<Tienda>(this.baseUrl + 'tiendas', newTienda);
   }

   deleteTienda(id: number) {
      return this.http.delete(this.baseUrl + 'tiendas/' + id);
   }

   editTienda(editTienda: EditTienda) {
      return this.http.put(this.baseUrl + 'tiendas', editTienda);
   }
}
