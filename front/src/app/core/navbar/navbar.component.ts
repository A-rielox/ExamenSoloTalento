import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
   items: MenuItem[] = [];
   navItems: MenuItem[] = [];

   constructor(public accountService: AccountService, private router: Router) {}

   ngOnInit(): void {
      this.setItems();
   }

   logout() {
      this.accountService.logout();
      this.router.navigateByUrl('/');
   }

   setItems() {
      this.items = [
         {
            label: 'Salir',
            icon: 'pi pi-sign-out',
            command: () => {
               this.logout();
            },
         },
      ];

      this.navItems = [
         {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: ['/'],
         },
         {
            label: 'Salir',
            icon: 'pi pi-sign-out',
         },
      ];
   }

   aClass() {
      return 'flex h-full px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 border-left-2 lg:border-bottom-2 lg:border-left-none border-transparent hover:border-primary font-medium cursor-pointer transition-colors transition-duration-150';
   }
}
