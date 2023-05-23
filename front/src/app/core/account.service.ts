import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../shared/_models/user';
import { HttpClient } from '@angular/common/http';
import { LoginModel, RegisterModel } from '../shared/_models/accountServ';

@Injectable({
   providedIn: 'root',
})
export class AccountService {
   baseUrl = 'https://localhost:5001/api/';

   private currentUserSource = new BehaviorSubject<User | null>(null);
   currentUser$ = this.currentUserSource.asObservable();

   constructor(private http: HttpClient) {}

   login(model: LoginModel) {
      return this.http.post<User>(this.baseUrl + 'clientes/login', model).pipe(
         map((res) => {
            const user = res;

            if (user) {
               this.setCurrentUser(user);
            }
         })
      );
   }

   register(model: RegisterModel) {
      // estoy pasando el confirmPass
      return this.http
         .post<User>(this.baseUrl + 'clientes/register', model)
         .pipe(
            map((user) => {
               if (user) {
                  this.setCurrentUser(user);
               }

               return user;
            })
         );

      /* 
      {
	      "nombre": "Ivan", 
	      "email": "ivan@test.com",
	      "password": "P@ssword1"
      }
      */
   }

   setCurrentUser(user: User) {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
   }

   logout() {
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
   }
}
