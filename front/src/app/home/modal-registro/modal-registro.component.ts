import { Component, OnInit } from '@angular/core';
import {
   AbstractControl,
   FormBuilder,
   FormGroup,
   ValidatorFn,
   Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/account.service';

@Component({
   selector: 'app-modal-registro',
   templateUrl: './modal-registro.component.html',
   styleUrls: ['./modal-registro.component.css'],
})
export class ModalRegistroComponent implements OnInit {
   visibleRegister = false;
   registerForm: FormGroup = new FormGroup({});
   validationErrors: string[] | undefined;

   constructor(
      private accountService: AccountService,
      private router: Router,
      private fb: FormBuilder
   ) {}

   ngOnInit(): void {
      this.initializeForm();
   }

   initializeForm() {
      this.registerForm = this.fb.group({
         nombre: ['', Validators.required],
         email: ['', Validators.required],
         password: [
            '',
            [
               Validators.required,
               Validators.minLength(4),
               Validators.maxLength(12),
            ],
         ],
         confirmPassword: [
            '',
            [Validators.required, this.matchValues('password')],
         ],
      });

      // por si cambia el password despues de poner el confirmPassword y pasar la validacion
      this.registerForm.controls['password'].valueChanges.subscribe(() => {
         this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      });
   }

   matchValues(matchTo: string): ValidatorFn {
      return (control: AbstractControl) => {
         return control.value === control.parent?.get(matchTo)?.value
            ? null
            : { notMatching: true };
      };
   }

   register() {
      this.validationErrors = undefined;

      this.accountService.register(this.registerForm.value).subscribe({
         next: (res) => {
            this.router.navigateByUrl('/articulos');

            this.visibleRegister = false;
         },
         error: (error) => {
            console.log(error);
         },
      });
   }

   // abre el modal
   openRegister() {
      this.visibleRegister = !this.visibleRegister;
   }
}
