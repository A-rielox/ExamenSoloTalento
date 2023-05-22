import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

interface LoginForm {
   email: string;
   password: string;
}

@Component({
   selector: 'app-modal-login',
   templateUrl: './modal-login.component.html',
   styleUrls: ['./modal-login.component.css'],
})
export class ModalLoginComponent implements OnInit {
   loginForm: LoginForm = {} as LoginForm;
   visibleLogin = false;

   constructor(
      private accountService: AccountService,
      private router: Router
   ) {}

   ngOnInit(): void {
      // QUITAR
      this.loginForm.email = 'ariel@test.com';
      this.loginForm.password = 'P@ssword1';
      // QUITAR
   }

   openLogin() {
      this.visibleLogin = !this.visibleLogin;
   }

   login() {
      console.log('login');

      this.accountService.login(this.loginForm).subscribe({
         next: () => {
            this.router.navigateByUrl('/articulos');
         },
         error: (err) => {},
      });

      this.visibleLogin = false;
   }
}
