import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articulo } from '../shared/_models/articulo';

@Injectable({
   providedIn: 'root',
})
export class StoreService {
   baseUrl = 'https://localhost:5001/api/';

   constructor(private http: HttpClient) {}

   getProducts() {
      return this.http.get<Articulo[]>(this.baseUrl + 'articulos');
   }
}
