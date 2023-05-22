import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulo } from 'src/app/shared/_models/articulo';
import { NewArticulo } from 'src/app/shared/_models/newArticulo';
import { ItemsService } from '../items.service';
import { Router } from '@angular/router';
import { EditArticulo } from 'src/app/shared/_models/editArticulo';

@Component({
   selector: 'app-add-item',
   templateUrl: './add-item.component.html',
   styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
   title?: string;
   articuloToEdit?: Articulo;
   edit?: boolean;

   ////////
   componentMode: string = 'New';
   ArticulosForm: FormGroup = new FormGroup({});
   // postToEdit?: any;
   allCats?: any[];

   constructor(
      private fb: FormBuilder,
      private itemsService: ItemsService,
      private router: Router
   ) {
      const navigation = this.router.getCurrentNavigation();
      this.articuloToEdit = navigation?.extras.state?.['articulo'];

      this.edit = this.articuloToEdit ? true : false;

      if (this.articuloToEdit) {
         this.title = 'Editar Artículo';
      } else {
         this.title = 'Añadir Artículo';
      }
   }

   ngOnInit(): void {
      this.initializeForm();
      this.allCats = [
         { name: 'Pantalón', tipoId: 1 },
         { name: 'Camisa', tipoId: 2 },
         { name: 'Zapatos', tipoId: 3 },
         { name: 'Reloj', tipoId: 4 },
         { name: 'Gorra', tipoId: 5 },
         { name: 'Guantes', tipoId: 6 },
         { name: 'Sombrilla', tipoId: 7 },
      ];

      //          edicion
      if (this.articuloToEdit) {
         this.componentMode = 'Edit';

         const { codigo, descripcion, precio, imagen, stock, tipo } =
            this.articuloToEdit;

         let elTipo = this.allCats.filter((el) => el.name === tipo);

         this.ArticulosForm.setValue({
            codigo,
            descripcion,
            precio,
            imagen,
            stock,
            tipo: elTipo,
         });
      }
   }

   initializeForm() {
      this.ArticulosForm = this.fb.group({
         codigo: [-1, Validators.required],
         descripcion: [
            '',
            [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(50),
            ],
         ],
         precio: [0, [Validators.required]],
         imagen: [''],
         stock: [0, [Validators.required]],

         tipo: [0, Validators.required],
      });
   }

   sendArticulo() {
      const { codigo, descripcion, precio, imagen, stock, tipo } =
         this.ArticulosForm.value;

      if (!descripcion || !precio || !stock || !tipo) return;

      if (this.componentMode === 'New') {
         // prettier-ignore
         const newArticulo: NewArticulo = {
            descripcion, precio, imagen, stock, tipoId: tipo[0].tipoId,
      };

         this.itemsService.addArticulo(newArticulo).subscribe({
            next: () => {
               this.ArticulosForm.reset();
               this.router.navigateByUrl('/articulos');
            },
         });
      } else if (this.componentMode === 'Edit') {
         // prettier-ignore
         const editArticulo: EditArticulo = {
            codigo, descripcion, precio, imagen, stock, tipoId: tipo[0].tipoId,
         };

         this.itemsService.editArticulo(editArticulo).subscribe({
            next: () => {
               this.ArticulosForm.reset();
               this.router.navigateByUrl('/articulos');
            },
         });

         //    {
         //       "codigo": 13,
         //       "descripcion": "Cómodo y elegante par de zapatos.",
         //       "precio": 2220,
         //       "imagen": "https://res.cloudinary.com/dxrrk3nvu/image/upload/v1684694911/LaApp/n9jz8yb1dsh0yemobqjr.jpg",
         //       "stock": 2220,
         //       "tipoId": 3
         //   }
      }

      ////////////////////////////////////////////////

      // const { category, title, content, id } = this.PostsForm.value;
      // if (!category || !title || !content) return;
      // let cat = category[0]?.name;

      // if (this.componentMode === 'New') {
      // } else if (this.componentMode === 'Edit') {
      // const editedPost: EditedPost = {
      //    id: id,
      //    title: title,
      //    category: cat,
      //    content: content,
      // };
      // this.postsService.editPost(editedPost).subscribe({
      //    next: (_) => {
      //       this.callNotificationAndLoadRecipes(this.textL.postEdited);
      //       this.PostsForm.reset();
      //       this.router.navigateByUrl('/posts');
      //    },
      // });
      // }
   }
}
