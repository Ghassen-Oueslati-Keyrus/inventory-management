
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { FileHandle } from 'src/app/interfaces/file-handle';
import { Product } from 'src/app/interfaces/product';
import { ImageService } from 'src/app/services/image.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  product: Product = {
    name: "",
    price: 0,
    description: "",
    brand: "",
    categoryId: 0,
    quantity: 0,
    photos: [],
    discountedPrice: 0,
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
    typeAlimentation:'',
  };
  id: any;
  productForm: any;
  showPromoOptions: boolean = false;
  reductionPercent: any;
  newPrice: any;
  categories: any;
  category: any;
  constructor(private productService: ProductService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService) {

  }

  ngOnInit() {
    this.getCategories();

    this.getProductById();
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(
      categories => {this.categories = categories;
      console.log(categories)});
      
  }
  calculReduction(){
    if (this.product.discountedPrice && this.product.discountedPrice>0) {
      this.newPrice = this.product.discountedPrice;
      this.reductionPercent = Math.floor(((this.product.price - this.newPrice) * 100) / this.product.price);
    }
  }
  getProductById() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(this.id)
      .pipe(map(p => this.imageService.createImages(p)))
      .subscribe(
        (data: Product) => {
          this.product = data;
          this.calculReduction();

        }
      )
  }
  editProduct() {
    if (this.productForm.invalid || this.product.photos.length == 0) {
      if (this.productForm.invalid) {
        Swal.fire({
          title: 'Oops !',
          text: 'Champs invalide',
          icon: 'error',
          confirmButtonText: 'Retour',
          confirmButtonColor: 'Red',
        });
      }
      else {
        Swal.fire({
          title: 'Oops !',
          text: 'Veuillez entrer au moins une photo',
          icon: 'error',
          confirmButtonText: 'Retour',
          confirmButtonColor: 'Red',
        });
      }
    }
    else {
      if(this.showPromoOptions ) {this.product.discountedPrice = this.newPrice};
      const productFormData = this.prepareFormData(this.product);
      this.productService.createProduct(productFormData).subscribe(
        (response: Product) => {
          Swal.fire({
            icon: 'success',
            title: 'Le produit ' + this.product.name + ' à été bien modifier',
            showConfirmButton: false,
            timer: 3000
          });
          this.router.navigate(["shop"]);
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
  showPromo() {
    this.showPromoOptions = !this.showPromoOptions;
  }
  updateNouveauPrix() {
    this.newPrice = Math.floor((this.product.price * (1 - (this.reductionPercent / 100))));

  }

  updateReductionPourcentage() {
    this.reductionPercent = Math.floor(((this.product.price - this.newPrice) * 100) / this.product.price);
  }
}
