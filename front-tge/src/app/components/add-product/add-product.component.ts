import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/interfaces/file-handle';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    name: "",
    price: 0,
    description: "",
    brand: "",
    quantity: 0,
    categoryId: 0,
    photos: [],
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
    private sanitizer: DomSanitizer) { }

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
      categories => this.categories = categories);
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
      const productFormData = this.prepareFormData(this.product);
      this.productService.createProduct(productFormData).subscribe(
        (response: Product) => {
          Swal.fire({
            icon: 'success',
            title: 'Le produit ' + this.product.name + ' est bien ajouté',
            showConfirmButton: false,
            timer: 3000
          });
          this.productForm.reset();
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
