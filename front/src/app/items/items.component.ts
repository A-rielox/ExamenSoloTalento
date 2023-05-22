import { Component, OnInit } from '@angular/core';
import { Articulo } from '../shared/_models/articulo';
import { ItemsService } from './items.service';
import { ConfirmationService } from 'primeng/api';
import { NavigationExtras, Router } from '@angular/router';

@Component({
   selector: 'app-items',
   templateUrl: './items.component.html',
   styleUrls: ['./items.component.css'],
   providers: [ConfirmationService],
})
export class ItemsComponent implements OnInit {
   articulos: Articulo[] = [];

   constructor(
      private itemsService: ItemsService,
      private confirmationService: ConfirmationService,
      private router: Router
   ) {}

   ngOnInit(): void {
      this.loadArticles();
   }

   loadArticles() {
      this.itemsService.getProducts().subscribe({
         next: (res) => {
            console.log(res);
            this.articulos = res;
         },
         error: (err) => console.log(err),
      });
   }

   onEdit(articulo: Articulo) {
      const navigationExtras: NavigationExtras = {
         state: { articulo: articulo },
      };

      this.router.navigateByUrl('/articulos/edit', navigationExtras);
   }

   confirm(event: Event, codigo: number) {
      if (!event.target) return;

      this.confirmationService.confirm({
         target: event.target,
         message: 'Confirma que desea borrar ?',
         acceptLabel: 'Borrar',
         rejectLabel: 'Cancelado',
         icon: 'pi pi-exclamation-triangle',

         accept: () => {
            if (!codigo) return;

            this.itemsService.deleteArticulo(codigo).subscribe({
               next: () => {
                  this.loadArticles();
               },
            });
         },
         reject: () => {
            console.log('cancelar');
         },
      });
   }
}
