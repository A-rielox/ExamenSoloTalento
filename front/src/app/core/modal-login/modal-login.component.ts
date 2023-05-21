import { Component, OnInit } from '@angular/core';

interface LoginForm {
   username: string;
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

   constructor() {}

   ngOnInit(): void {}

   openLogin() {
      this.visibleLogin = !this.visibleLogin;
   }

   login() {
      console.log('login');
      //    let notSummary = this.lang === 'Eng' ? 'Hello' : 'Hola.';
      //    let notDetail =
      //       this.lang === 'Eng'
      //          ? "It's good to have you back."
      //          : 'Que bueno tenerte de vuelta.';

      //    this.memberService.resetUserParams();
      //    this.recipesService.resetRecipeParams();
      //    this.postsService.resetPostParams();

      //    this.accountService.login(this.loginForm).subscribe({
      //       next: () => {
      //          this.router.navigateByUrl('/members');

      //          this.notification.addNoti({
      //             severity: 'success',
      //             summary: notSummary,
      //             detail: notDetail,
      //          });
      //       },
      //       error: (err) => {},
      //    });

      //    this.visibleLogin = false;
   }
}
