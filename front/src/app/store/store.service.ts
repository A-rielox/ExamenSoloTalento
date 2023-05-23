import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '../core/account.service';
import { take } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class StoreService {
   baseUrl = 'https://localhost:5001/api/';
   userEmail = '';

   constructor(
      private http: HttpClient,
      private accountService: AccountService
   ) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
         next: (user) => {
            if (user) {
               this.userEmail = user.email;
            }
         },
      });
   }

   sendCarrito(carrito: any) {
      console.log(this.userEmail, carrito);
      return this.http.post(
         this.baseUrl + 'carrito/' + this.userEmail,
         carrito
      );
   }
}
