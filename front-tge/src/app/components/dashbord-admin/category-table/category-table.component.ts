import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent {
  categoryForm: any;
  categories: any;
  category = {
    name : "",
  }

   constructor( private categoryService: CategoryService, 
    private fb : FormBuilder, private router : Router) { }

  ngOnInit() {
    this.getCategories();
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
    })
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(
      categories => this.categories = categories);
  }
  addCategory() {
    if (this.categoryForm.invalid ) {
        Swal.fire({
          title: 'Oops !',
          text: 'Veuillez entrer le nom du category',
          icon: 'error',
          confirmButtonText: 'Retour',
          confirmButtonColor: 'Red',
        });
    }
    else {
      this.categoryService.createCategory(this.category).subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'La categorie ' + this.category.name + ' à était bien ajouté',
            showConfirmButton: false,
            timer: 3000
          });
          this.getCategories();
          this.categoryForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  removeCategory(id : number){
    Swal.fire({
      title: 'Vous-étes sur de vouloir supprimer cette catégorie?',
      text: "Vous aurez pas le droit de la récupérer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe();
        Swal.fire(
          'Deleted!',
          'La catégorie à était bien supprimer.',
          'success'
        )
        this.getCategories();
      }
    })
  }
}
