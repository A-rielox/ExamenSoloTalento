import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/account.service';
import { User } from './shared/_models/user';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
   constructor(private accountService: AccountService) {}

   ngOnInit(): void {
      this.setCurrentUser();
   }

   setCurrentUser() {
      const localUser = localStorage.getItem('user');

      if (!localUser) return;

      const user: User = JSON.parse(localUser);

      this.accountService.setCurrentUser(user);
   }
}
