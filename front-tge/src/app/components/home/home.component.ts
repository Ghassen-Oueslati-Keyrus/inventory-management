import { Options } from '@angular-slider/ngx-slider';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { 
  minValue: number = 0;
  maxValue: number = 1;
  options: Options = {
    floor: 0,
    ceil: 1
  };
  products: any;
  categorieIds: number[] = [];
  catIdUrl: any;
  showDiscountedProducts: boolean = false;
  enStock: boolean = false;
  horsStock: boolean = false;
  brands: string[] = [];
  brandSelected: string[] = [];
  highestPrice: any;
  filteredProducts: any;
  p: number = 1;
  itemsPerPage: number = 6;
  totalProduct: any;
  keyword: string = "";
  timer: any;


  constructor(private productService: ProductService,
    private imageService: ImageService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getSearchKeyword();
    this.getMaxValue();
    this.getAllProducts();
    this.getAllBrands();
  }

  /* Recuperer le mot rechercher dans la barre de recherche */
  public getSearchKeyword() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
    });
  }

  /* Recuperer le prix le plus elevé pour le mettre dans le filtre */
  public getMaxValue() {
    this.productService.getProducts()
    .pipe(        
      map((products: Product[]) => this.locationFalse(products)),
    )
      .subscribe(
        (data: any) => {
          this.maxValue = Math.max(...data.map((product: any) => product.discountedPrice || product.price));
          this.options.ceil = this.maxValue;
        }, (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
  }

  /* Recuperer tout les produits avec le map : creation d'image  */
  public getAllProducts() {

      this.productService.getProducts()
        .pipe(
          map((prod: Product[], i) => prod.map((product: Product) => this.imageService.createImages(product))),
          map((products: Product[]) => this.filterProductsByBrand(products)),
          map((products: Product[]) => this.locationFalse(products)),
          map((products: Product[]) => this.Disponibilite(products)),
          map((products: Product[]) => this.filterProductsByKeyword(products)),
          map((products: Product[]) => this.filterProductPrice(products)),
          map((products: Product[]) => this.filterDiscountedProducts(products)),


        )
        .subscribe(
          (data: any) => {
            this.products = data;
            this.totalProduct = this.products.length;
          }, (error: HttpErrorResponse) => {
            console.log(error)
          }
        )

  }
  /* Recuperer les marques des produits */
  public getAllBrands() {
    this.productService.getProductBrands().subscribe(
      (data: any) => {
        this.brands = data;
        console.log(this.brands)
      }
    )
  }

  /* Filtrer avec les prix */

  filterProducts() {
    this.getAllProducts();
  }
  filterProductPrice(data: Product[]): Product[] {
    return data.filter((product: Product) => product.discountedPrice !== undefined && product.discountedPrice > 0 ?
      product.discountedPrice >= this.minValue && product.discountedPrice <= this.maxValue :
      product.price >= this.minValue && product.price <= this.maxValue)
  }

  /* selection by brands , 
  ajouter dans le tableau brandSelected et faire l'appel au service getProductByBrands*/
  brandsSelected(event: Event, brand: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.brandSelected= this.brandSelected.concat(brand);
    }
    else {
      const index = this.brandSelected.indexOf(brand);
      this.brandSelected.splice(index, 1)
    }
        this.getAllProducts();
  }

  filterProductsByBrand(products: Product[]): Product[] {
    if (this.brandSelected.length > 0) {
      return products.filter(product => this.brandSelected.includes(product.brand.toUpperCase()));
    }
    else {
      return products;
    }
  }
  /* promotions part */
  private filterDiscountedProducts(products: Product[]): Product[] {
    if (this.showDiscountedProducts) {
      return products.filter(p => p.discountedPrice !== undefined && p.discountedPrice > 0);
    } else {
      return products;
    }
  }
  public onShowDiscountedProductsChange() {
    this.getAllProducts();
  }

  /* disponibilité */
  Disponibilite(products: Product[]): Product[] {
    if (this.enStock && !this.horsStock) {
      return products.filter(p => p.quantity > 0)
    }
    if (!this.enStock && this.horsStock) {
      return products.filter(p => p.quantity == 0)
    }
    else {
      return products;
    }
  }
  showDisponibility() {
    this.getAllProducts();
  }
  /* filtrer avec le mot clé rechercher */
  filterProductsByKeyword(products: Product[]): Product[] {
    if (!this.keyword) return products;
    else {
      return products.filter((product: Product) =>
        product.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.keyword.toLowerCase()) ||
        product.description.toLowerCase().includes(this.keyword.toLowerCase())
      );
    }

  }
  locationFalse(products : Product[]): Product[]{
    return products.filter(p => p.location == false)
  }
}
