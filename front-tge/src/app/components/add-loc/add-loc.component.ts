import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandle } from 'src/app/interfaces/file-handle';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-loc',
  templateUrl: './add-loc.component.html',
  styleUrls: ['./add-loc.component.css']
})
export class AddLocComponent {
  product: Product = {
    name: "",
    price: 0,
    description: "",
    brand: "",
    quantity: 0,
    categoryId: 0,
    photos: [],
    location: true,
    groupeElectrogeneType: '',
    puissanceContinue : 0,
    origine: '',
    moteur:  '' ,
    alternateur: '',
    refroidissement: '',
    nombreCylindres: '',
    demarrage: '',
    carteDemarrage: '',
    consommation: '',
    poids: 0,
    dimension: '',
    volumeExpedie: '',
    nombreHeures: 0,
    typeCarburant:'',
    capaciteReservoirCarburant:0,
    vitesseMoteur:0,
    amperage:0,
    typeAlimentation:''
  };
  productForm: any;
  categories: any;
  category: any;
  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer,
    private router : Router) { }

  ngOnInit() {
    this.getCategories();
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (categories:any) => this.categories = categories);
  }

  addProduct() {
    if (this.productForm.invalid || this.product.photos.length == 0) {
      if (this.product.photos.length == 0) {
        Swal.fire({
          title: 'Oops !',
          text: 'Veuillez entrer au moins une photo',
          icon: 'error',
          confirmButtonText: 'Retour',
          confirmButtonColor: 'Red',
        });
      }
      else {
        Swal.fire({
          title: 'Oops !',
          text: 'Champs invalide',
          icon: 'error',
          confirmButtonText: 'Retour',
          confirmButtonColor: 'Red',
        });
      }
    }
    else {
      this.product.location = true;
      const productFormData = this.prepareFormData(this.product);
      this.productService.createProduct(productFormData).subscribe(
        (response: Product) => {
          Swal.fire({
            icon: 'success',
            title: 'La location' + this.product.name + ' à était bien ajouté',
            showConfirmButton: false,
            timer: 3000
          });
          this.product.description = "";
          this.product.name = "";
          this.product.quantity = 0;
          this.product.categoryId = 0;
          this.product.price = 0;
          this.product.brand = "";
          this.product.photos = [];
          this.router.navigate(["dashbord"]);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }
  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    for (var i = 0; i < product.photos.length; i++) {
      formData.append(
        'imageFile',
        product.photos[i].file,
        product.photos[i].file.name
      )
    }
    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.photos.push(fileHandle)
    }
  }
  removeImage(i: number) {
    this.product.photos.splice(i, 1)
  }
  removeImages() {
    this.product.photos = [];
  }
  fileDropped(fileHandle: FileHandle) {
    this.product.photos.push(fileHandle)
  }
}
