import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashbord-admin',
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.css'],
})
export class DashbordAdminComponent {
  /*   @Input() product = {} as Product;
   */ currentPhotoIndex = 0;
  id: any;
  product = {} as Product;
  products: Product[] = [];
  totalProduct: number = 0;
  p: number = 1;
  itemsPerPage: number = 6;
  constructor(
    private productService: ProductService,
    private imageService: ImageService,
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService
      .getProducts()
      .pipe(
        map((prod: Product[], i) =>
          prod.map((product: Product) =>
            this.imageService.createImages(product)
          )
        ),
        map((products: Product[]) => this.locationFalse(products)),
      )
      .subscribe(
        (data: any) => {
          this.products = data;
          this.totalProduct = this.products.length;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
  removeProduit(id : any){
    Swal.fire({
      title: 'Vous-étes sur de vouloir supprimer ce produit?',
      text: "Vous aurez pas le droit de la récupérer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe();
        Swal.fire(
          'Deleted!',
          'Le produit à était bien supprimer.',
          'success'
        )
        this.getAllProducts();
      }
    })
  }

  locationFalse(products : Product[]): Product[]{
    return products.filter(p => p.location == false)
  }
}
