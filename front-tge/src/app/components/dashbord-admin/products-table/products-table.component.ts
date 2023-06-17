import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent {
  products: Product[] = [];
  totalProduct: number = 0;
  keyword: any;

  p: number = 1;
  itemsPerPage: number = 6;
  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private router: Router,
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
        map((products: Product[]) => this.searchByKeyWord(products)),
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
  removeProduct(id : any){
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
          'Supprimer!',
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
searchByKeyWord(products : Product[]) {
  if (!this.keyword) return products;
  else {
    return products.filter((product: Product) =>
      product.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
      product.brand.toLowerCase().includes(this.keyword.toLowerCase()) ||
      product.description.toLowerCase().includes(this.keyword.toLowerCase()) ||
      product.reference?.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }
}
}

