import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { CategoryService} from 'src/app/services/category.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css'],
})
export class ProductsingleComponent {
/*   @Input() product = {} as Product;
 */  currentPhotoIndex = 0;
  id: any;
  product = {} as Product;
  LoggedIn: boolean = false;
  categoryProduct : any;
  category:any;
  isLoggedIn = false;
  roles: any;
  constructor(private activatedRoute: ActivatedRoute, 
    private productService: ProductService, 
    private imageService: ImageService,
    private categoryService : CategoryService,

    private storage: StorageService, private router:Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.getProductById(this.id);
    this.LoggedIn = this.storage.isLoggedIn();

    this.roles = this.storage.getUser().roles;
    console.log(this.roles)
  }
  PhotosOrder(i:number): any{
    switch(i+1){
      case 1:
        return "img-first";
      case 2:
        return "img-second";
    }
  }

  public getProductById(id : number){
    this.productService.getProductById(id)
  .pipe(map(p => this.imageService.createImages(p)))
      .subscribe({
        next: data => {
          this.product = data;
          console.log(data)
          this.categoryService.getCategoryById(data.categoryId).subscribe(
            (res) => {
              this.category = res;
              this.getProductsByCategorieId(this.category.id);
              console.log(res)
            })
        }
      });
  }
  public getProductsByCategorieId(idCat : number){
    this.productService.findByCategoryId(idCat)
    .pipe(
      map((prod: Product[], i) => prod.map((product: Product) => this.imageService.createImages(product))),
      map((products: Product[]) => this.removeCurrentProduct(products)),
      map(products => products.slice(0, 8))
    )
        .subscribe({
          next: data => {
        this.categoryProduct = data;
        console.log(data)
      }}
    )
  }
  reduction(prod : any): number{
    return Math.floor(((prod.price - prod.discountedPrice) * 100)/ prod.price);
  }

  removeCurrentProduct(products : Product[]): Product[]{
return products.filter(p => p.id != this.id);
  }

  demanderDevis(){
    if(this.LoggedIn){
      this.router.navigate(['/addDevis']);
    }
    else{
      Swal.fire({
        title: 'Vous n\'étes pas connecté !',
        text: "Voulez vous se dérigez vers la page de connexion ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#green',
        cancelButtonColor: '#red',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      })
    }
  }
  adminRole() {
    if (this.LoggedIn && this.roles == 'ROLE_ADMIN') {
      return true
    }
    else return false;
  }
  moderatorRole(){
    if (this.LoggedIn && (this.roles == 'ROLE_ADMIN' || this.roles == 'ROLE_MODERATOR')){
      return true;
    }
    else return false;
  }
}
