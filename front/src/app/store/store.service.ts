import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class StoreService {
   baseUrl = 'https://localhost:5001/api/';

   constructor() {}
}
