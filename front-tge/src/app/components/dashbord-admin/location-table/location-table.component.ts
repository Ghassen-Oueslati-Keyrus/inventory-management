import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css']
})
export class LocationTableComponent {
  products: Product[] = [];
  keyword: any;
  totalProduct: number = 0;
  p: number = 1;
  itemsPerPage: number = 6;
  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService
      .getProducts()
      .pipe(
        map((products: Product[]) => this.location(products)),
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
      text: "Vous aurez pas le droit de le récupérer!",
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
location(products : Product[]): Product[]{
  return products.filter(p => p.location == true)
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
