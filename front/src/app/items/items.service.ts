import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articulo } from '../shared/_models/articulo';
import { NewArticulo } from '../shared/_models/newArticulo';

@Injectable({
   providedIn: 'root',
})
export class ItemsService {
   baseUrl = 'https://localhost:5001/api/';

   constructor(private http: HttpClient) {}

   getProducts() {
      return this.http.get<Articulo[]>(this.baseUrl + 'articulos');
   }

   addArticulo(newArticulo: NewArticulo) {
      return this.http.post<Articulo>(this.baseUrl + 'articulos', newArticulo);
   }

   deleteArticulo(codigo: number) {
      console.log('en el service');
      return this.http.delete(this.baseUrl + 'articulos/' + codigo);
   }
}
