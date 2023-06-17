import { Options } from '@angular-slider/ngx-slider';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

import { Product } from 'src/app/interfaces/product';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  catIdUrl: any;
  locationProducts(products : Product[]): Product[]{
    return products.filter(p => p.location == true)
  }

  minValue: number = 0;
  maxValue: number = 1;
  minHeure: number = 0;
  maxHeure: number = 1;
  options: Options = {
    floor: 0,
    ceil: 1
  };
  options1: Options = {
    floor: 0,
    ceil: 1
  };
  categories: any;
  categorieIds: number[] = [];
  products: any;
  showDiscountedProducts: boolean = false;
  enStock: boolean = false;
  horsStock: boolean = false;
  brands: string[] = [];
  brandSelected: string[] = [];
  highestPrice: any;
  filteredProducts: any;
  types: any = [];
  typeSelected: any = [];
  puissances: any = [];
  puissanceSelected: any = [];
  moteurs: any = [];
  moteurSelected: any = [];
  alternateurs: any = [];
  alternateurSelected: any = [];
  refroidissements: any = [];
  refroidissementSelected: any = [];
  nombreCylindres: any = [];
  nombreCylindreSelected: any = [];
  demarrages: any = [];
  demarrageSelected: any = [];
  carteDemarrages: any = [];
  carteDemarrageSelected: any = [];
  capotages: any = [];
  capotageSelected: any = [];
  nombreHeures: any = [];
  nombreHeureSelected: any = [];
  typeCarburant: any = [];
  typeCarburantSelected: any = [];
  vitesseMoteur: any = [];
  vitesseMoteurSelected: any = [];
  amperage: any = [];
  amperageSelected: any = [];
  typeAlimentation: any = [];
  typeAlimentationSelected: any = [];
  p: number = 1;
  itemsPerPage: number = 12;
  totalProduct: any;
  keyword: string = "";
  timer: any;


  constructor(private productService: ProductService,
    private imageService: ImageService,
    private categorieService: CategoryService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getSearchKeyword();
    this.getMaxValue();
    this.getMaxVHeure()
    this.getSearchedCategoryId();
    this.getAllCategories();
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
      map((products : any) => this.locationProducts(products)),
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
  
  /* Recuperer le nombre d'heure le plus elevé pour le mettre dans le filtre */
  public getMaxVHeure() {
    this.productService.getProducts()
    .pipe(
      map((products : any) => this.locationProducts(products)),
    )
      .subscribe(
        (data: any) => {
          this.maxHeure = Math.max(...data.map((product: any) => product.nombreHeures));
          this.options1.ceil = this.maxHeure;
        }, (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
  }
 /* Recuperer l'id du category s'il y en un */
 public getSearchedCategoryId() {
  this.catIdUrl = this.activatedRoute.snapshot.paramMap.get('idCat');
}
  /* Recuperer tout les produits avec le map : creation d'image  */
  public getAllProducts() {
    if (this.categorieIds.length > 0) {
      this.getAllProductsByCategories();
    }
      else{this.productService.getProducts()
        .pipe(
          map((prod: Product[], i) => prod.map((product: Product) => this.imageService.createImages(product))),
          map((products: Product[]) => this.filterProductsByBrand(products)),
          map((products: Product[]) => this.filterProductsByType(products)),
          map((products: Product[]) => this.filterProductsByPuissance(products)),
          map((products: Product[]) => this.filterProductsByMoteur(products)),
          map((products: Product[]) => this.filterProductsByAlternateur(products)),
          map((products: Product[]) => this.filterProductsBynombreCylindres(products)),
          map((products: Product[]) => this.filterProductsByDemarrage(products)),
          map((products: Product[]) => this.filterProductsByCarteDemarrage(products)),
          map((products: Product[]) => this.filterProductsByCapotage(products)),          
          map((products: Product[]) => this.filterProductsBytypeCarburant(products)),
          map((products: Product[]) => this.filterProductsByvitesseMoteur(products)),
          map((products: Product[]) => this.filterProductsByamperage(products)),
          map((products: Product[]) => this.filterProductsBytypeAlimentation(products)),  
          map((products: Product[]) => this.filterProductHeure(products)),

          map((products : any) => this.locationProducts(products)),
          map((products: Product[]) => this.Disponibilite(products)),
          map((products: Product[]) => this.filterProductPrice(products)),
          map((products: Product[]) => this.filterDiscountedProducts(products)),


        )
        .subscribe(
          (data: any) => {
            this.products = data;
            if (this.types.length == 0) {
              const typesSet = new Set(this.products.map((product: any) => product.groupeElectrogeneType));
              this.types = Array.from(typesSet).filter((type: any) => !!type);
            }
            if (this.puissances.length == 0) {
              const puissancesSet = new Set(this.products.map((product: any) => product.puissanceContinue));
              this.puissances = Array.from(puissancesSet).filter((puissance: any) => !!puissance);
            }
            if (this.moteurs.length == 0) {
              const moteursSet = new Set(this.products.map((product: any) => product.moteur));
              this.moteurs = Array.from(moteursSet).filter((moteur: any) => !!moteur);
            }
            
            if (this.alternateurs.length == 0) {
              const alternateursSet = new Set(this.products.map((product: any) => product.alternateur));
              this.alternateurs = Array.from(alternateursSet).filter((alternateur: any) => !!alternateur);
            }
            
            if (this.refroidissements.length == 0) {
              const refroidissementsSet = new Set(this.products.map((product: any) => product.refroidissement));
              this.refroidissements = Array.from(refroidissementsSet).filter((refroidissement: any) => !!refroidissement);
            }
            
            if (this.nombreCylindres.length == 0) {
              const nombreCylindresSet = new Set(this.products.map((product: any) => product.nombreCylindres));
              this.nombreCylindres = Array.from(nombreCylindresSet).filter((nombreCylindres: any) => !!nombreCylindres);
            }
            
            if (this.demarrages.length == 0) {
              const demarragesSet = new Set(this.products.map((product: any) => product.demarrage));
              this.demarrages = Array.from(demarragesSet).filter((demarrage: any) => !!demarrage);
            }
            
            if (this.carteDemarrages.length == 0) {
              const carteDemarragesSet = new Set(this.products.map((product: any) => product.carteDemarrage));
              this.carteDemarrages = Array.from(carteDemarragesSet).filter((carteDemarrage: any) => !!carteDemarrage);
            }
            
            if (this.capotages.length == 0) {
              const capotagesSet = new Set(this.products.map((product: any) => product.capotage));
              this.capotages = Array.from(capotagesSet).filter((capotage: any) => !!capotage);
            }
            
            if (this.nombreHeures.length == 0) {
              const nombreHeuresSet = new Set(this.products.map((product: any) => product.nombreHeures));
              this.nombreHeures = Array.from(nombreHeuresSet).filter((nombreHeures: any) => !!nombreHeures);
            }
            if (this.typeCarburant.length == 0) {
              const typeCarburantSet = new Set(this.products.map((product: any) => product.typeCarburant));
              this.typeCarburant = Array.from(typeCarburantSet).filter((typeCarburant: any) => !!typeCarburant);
            }
            
            if (this.vitesseMoteur.length == 0) {
              const vitesseMoteurSet = new Set(this.products.map((product: any) => product.vitesseMoteur));
              this.vitesseMoteur = Array.from(vitesseMoteurSet).filter((vitesseMoteur: any) => !!vitesseMoteur);
            }
            
            if (this.amperage.length == 0) {
              const amperageSet = new Set(this.products.map((product: any) => product.amperage));
              this.amperage = Array.from(amperageSet).filter((amperage: any) => !!amperage);
            }
            
            if (this.typeAlimentation.length == 0) {
              const typeAlimentationSet = new Set(this.products.map((product: any) => product.typeAlimentation));
              this.typeAlimentation = Array.from(typeAlimentationSet).filter((typeAlimentation: any) => !!typeAlimentation);
            }
            this.totalProduct = this.products.length;
          }, (error: HttpErrorResponse) => {
            console.log(error)
          }
        )}
  }
  /* trouvées les produits de ces categories */
  getAllProductsByCategories() {
    this.productService.findByCategoryIds(this.categorieIds)
      .pipe(
        map((prod: Product[], i) => prod.map((product: Product) => this.imageService.createImages(product))),
        map((products : any) => this.locationProducts(products)),
        map((products: Product[]) => this.Disponibilite(products)),
        map((products: Product[]) => this.filterProductPrice(products)),
        map((products: Product[]) => this.filterProductsByBrand(products)),
        map((products: Product[]) => this.filterProductsByType(products)),
        map((products: Product[]) => this.filterProductsByPuissance(products)),
        map((products: Product[]) => this.filterProductsByMoteur(products)),
        map((products: Product[]) => this.filterProductsByAlternateur(products)),
        map((products: Product[]) => this.filterProductsBynombreCylindres(products)),
        map((products: Product[]) => this.filterProductsByDemarrage(products)),
        map((products: Product[]) => this.filterProductsBytypeCarburant(products)),
        map((products: Product[]) => this.filterProductsByvitesseMoteur(products)),
        map((products: Product[]) => this.filterProductHeure(products)),
        map((products: Product[]) => this.filterProductsByamperage(products)),
        map((products: Product[]) => this.filterProductsBytypeAlimentation(products)),
        map((products: Product[]) => this.filterProductsByCarteDemarrage(products)),
        map((products: Product[]) => this.filterProductsByCapotage(products)), 
        map((products: Product[]) => this.filterDiscountedProducts(products)),


      )
      .subscribe(
        (data: any) => {
          this.products = data;
          if (this.types.length == 0) {
            const typesSet = new Set(this.products.map((product: any) => product.groupeElectrogeneType));
            this.types = Array.from(typesSet).filter((type: any) => !!type);
          }
          if (this.puissances.length == 0) {
            const puissancesSet = new Set(this.products.map((product: any) => product.puissanceContinue));
            this.puissances = Array.from(puissancesSet).filter((puissance: any) => !!puissance);
          }
          if (this.moteurs.length == 0) {
            const moteursSet = new Set(this.products.map((product: any) => product.moteur));
            this.moteurs = Array.from(moteursSet).filter((moteur: any) => !!moteur);
          }
          
          if (this.alternateurs.length == 0) {
            const alternateursSet = new Set(this.products.map((product: any) => product.alternateur));
            this.alternateurs = Array.from(alternateursSet).filter((alternateur: any) => !!alternateur);
          }
          
          if (this.refroidissements.length == 0) {
            const refroidissementsSet = new Set(this.products.map((product: any) => product.refroidissement));
            this.refroidissements = Array.from(refroidissementsSet).filter((refroidissement: any) => !!refroidissement);
          }
          
          if (this.nombreCylindres.length == 0) {
            const nombreCylindresSet = new Set(this.products.map((product: any) => product.nombreCylindres));
            this.nombreCylindres = Array.from(nombreCylindresSet).filter((nombreCylindres: any) => !!nombreCylindres);
          }
          
          if (this.demarrages.length == 0) {
            const demarragesSet = new Set(this.products.map((product: any) => product.demarrage));
            this.demarrages = Array.from(demarragesSet).filter((demarrage: any) => !!demarrage);
          }
          
          if (this.carteDemarrages.length == 0) {
            const carteDemarragesSet = new Set(this.products.map((product: any) => product.carteDemarrage));
            this.carteDemarrages = Array.from(carteDemarragesSet).filter((carteDemarrage: any) => !!carteDemarrage);
          }
          
          if (this.capotages.length == 0) {
            const capotagesSet = new Set(this.products.map((product: any) => product.capotage));
            this.capotages = Array.from(capotagesSet).filter((capotage: any) => !!capotage);
          }
          
          if (this.nombreHeures.length == 0) {
            const nombreHeuresSet = new Set(this.products.map((product: any) => product.nombreHeures));
            this.nombreHeures = Array.from(nombreHeuresSet).filter((nombreHeures: any) => !!nombreHeures);
          
          }
          if (this.typeCarburant.length == 0) {
            const typeCarburantSet = new Set(this.products.map((product: any) => product.typeCarburant));
            this.typeCarburant = Array.from(typeCarburantSet).filter((typeCarburant: any) => !!typeCarburant);
          }
          
          if (this.vitesseMoteur.length == 0) {
            const vitesseMoteurSet = new Set(this.products.map((product: any) => product.vitesseMoteur));
            this.vitesseMoteur = Array.from(vitesseMoteurSet).filter((vitesseMoteur: any) => !!vitesseMoteur);
          }
          
          if (this.amperage.length == 0) {
            const amperageSet = new Set(this.products.map((product: any) => product.amperage));
            this.amperage = Array.from(amperageSet).filter((amperage: any) => !!amperage);
          }
          
          if (this.typeAlimentation.length == 0) {
            const typeAlimentationSet = new Set(this.products.map((product: any) => product.typeAlimentation));
            this.typeAlimentation = Array.from(typeAlimentationSet).filter((typeAlimentation: any) => !!typeAlimentation);
          }
          this.totalProduct = this.products.length;
        }, (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
  }

    /* Recuperer tout les categories et si il y 
  a un id category dans url on va cocher cette categorie et afficher ses produits */

  public getAllCategories() {
    this.categorieService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        if (this.catIdUrl) {
          const category = this.categories.find((c: any) => c.id == this.catIdUrl);
          category.checked = true;
          this.categorieIds.push(parseInt(this.catIdUrl));
          this.getAllProducts();
        }
      }
    )
  }
  /*   selection by category
 */ 
 public categorieSelected(event: Event, id: number) {
  const isChecked = (event.target as HTMLInputElement).checked;
  if (isChecked) {
    this.categorieIds.push(id);
  }
  else {
    const index = this.categorieIds.indexOf(id);
    this.categorieIds.splice(index, 1);
  }
  this.getAllProducts();
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

  filterProductHeure(data: Product[]): Product[] {
    return data.filter((product: Product) => product.nombreHeures !== undefined  ?
      product.nombreHeures >= this.minHeure && product.nombreHeures <= this.maxHeure : null)
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

  /* selection by brands , 
    ajouter dans le tableau brandSelected et faire l'appel au service getAllProducts*/
  typesSelected(event: Event, type: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      /* this.types.push(type) // pas la méme structure avec product.brand */
      this.typeSelected = this.typeSelected.concat(type);
    }
    else {
      const index = this.typeSelected.indexOf(type);
      this.typeSelected.splice(index, 1)
    }
    this.getAllProducts();
  }

  filterProductsByType(products: Product[]): Product[] {
    if (this.typeSelected.length > 0) {
      return products.filter(product => this.typeSelected.includes(product.groupeElectrogeneType));
    }
    else {
      return products;
    }
  }
  /* selection by puissances , 
    ajouter dans le tableau puissances et faire l'appel au service getAllProducts*/
    puissancesSelected(event: Event, puissance: string) {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        /* this.types.push(type) // pas la méme structure avec product.brand */
        this.puissanceSelected = this.puissanceSelected.concat(puissance);
      }
      else {
        const index = this.puissanceSelected.indexOf(puissance);
        this.puissanceSelected.splice(index, 1)
      }
      this.getAllProducts();
    }
  
    filterProductsByPuissance(products: Product[]): Product[] {
      if (this.puissanceSelected.length > 0) {
        return products.filter(product => this.puissanceSelected.includes(product.puissanceContinue));
      }
      else {
        return products;
      }
    }
    /* selection by moteurs , 
    ajouter dans le tableau moteurs et faire l'appel au service getAllProducts*/
    moteursSelected(event: Event, moteur: string) {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        /* this.types.push(type) // pas la méme structure avec product.brand */
        this.moteurSelected = this.moteurSelected.concat(moteur);
      }
      else {
        const index = this.moteurSelected.indexOf(moteur);
        this.moteurSelected.splice(index, 1)
      }
      this.getAllProducts();
    }
  
    filterProductsByMoteur(products: Product[]): Product[] {
      if (this.moteurSelected.length > 0) {
        return products.filter(product => this.moteurSelected.includes(product.moteur));
      }
      else {
        return products;
      }
    }
        /* selection by moteurs , 
    ajouter dans le tableau moteurs et faire l'appel au service getAllProducts*/
    alternateursSelected(event: Event, alternateur: string) {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        /* this.types.push(type) // pas la méme structure avec product.brand */
        this.alternateurSelected = this.alternateurSelected.concat(alternateur);
      }
      else {
        const index = this.alternateurSelected.indexOf(alternateur);
        this.alternateurSelected.splice(index, 1)
      }
      this.getAllProducts();
    }
  
    filterProductsByAlternateur(products: Product[]): Product[] {
      if (this.alternateurSelected.length > 0) {
        return products.filter(product => this.alternateurSelected.includes(product.alternateur));
      }
      else {
        return products;
      }
    }
            /* selection by refroidissements , 
    ajouter dans le tableau refroidissements et faire l'appel au service getAllProducts*/
    nombreCylindresSelected(event: Event, nombreCylindre: number) {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        /* this.types.push(type) // pas la méme structure avec product.brand */
        this.nombreCylindreSelected = this.nombreCylindreSelected.concat(nombreCylindre);
      }
      else {
        const index = this.nombreCylindreSelected.indexOf(nombreCylindre);
        this.nombreCylindreSelected.splice(index, 1)
      }
      this.getAllProducts();
    }
  
    filterProductsBynombreCylindres(products: Product[]): Product[] {
      if (this.nombreCylindreSelected.length > 0) {
        return products.filter(product => this.nombreCylindreSelected.includes(product.nombreCylindres));
      }
      else {
        return products;
      }
    }
                /* selection by refroidissements , 
    ajouter dans le tableau refroidissements et faire l'appel au service getAllProducts*/
    demaragesSelected(event: Event, demarrage: string) {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        /* this.types.push(type) // pas la méme structure avec product.brand */
        this.demarrageSelected = this.demarrageSelected.concat(demarrage);
      }
      else {
        const index = this.demarrageSelected.indexOf(demarrage);
        this.demarrageSelected.splice(index, 1)
      }
      this.getAllProducts();
    }
  
    filterProductsByDemarrage(products: Product[]): Product[] {
      if (this.demarrageSelected.length > 0) {
        return products.filter(product => this.demarrageSelected.includes(product.demarrage));
      }
      else {
        return products;
      }
    }
                /* selection by refroidissements , 
    ajouter dans le tableau refroidissements et faire l'appel au service getAllProducts*/
    carteDemarragesSelected(event: Event, carteDemarrage: string) {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        /* this.types.push(type) // pas la méme structure avec product.brand */
        this.carteDemarrageSelected = this.carteDemarrageSelected.concat(carteDemarrage);
      }
      else {
        const index = this.carteDemarrageSelected.indexOf(carteDemarrage);
        this.carteDemarrageSelected.splice(index, 1)
      }
      this.getAllProducts();
    }
  
    filterProductsByCarteDemarrage(products: Product[]): Product[] {
      if (this.refroidissementSelected.length > 0) {
        return products.filter(product => this.carteDemarrageSelected.includes(product.carteDemarrage));
      }
      else {
        return products;
      }
    }
                /* selection by capotages , 
    ajouter dans le tableau capotages et faire l'appel au service getAllProducts*/
    refroidissementsSelected(event: Event, refroidissement: string) {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        /* this.types.push(type) // pas la méme structure avec product.brand */
        this.refroidissementSelected = this.refroidissementSelected.concat(refroidissement);
      }
      else {
        const index = this.refroidissementSelected.indexOf(refroidissement);
        this.refroidissementSelected.splice(index, 1)
      }
      this.getAllProducts();
    }
  
    filterProductsByRefroidissement(products: Product[]): Product[] {
      if (this.refroidissementSelected.length > 0) {
        return products.filter(product => this.refroidissementSelected.includes(product.capotage));
      }
      else {
        return products;
      }
    }
                /* selection by capotages , 
    ajouter dans le tableau capotages et faire l'appel au service getAllProducts*/
    capotagesSelected(event: Event, capotage: string) {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        /* this.types.push(type) // pas la méme structure avec product.brand */
        this.capotageSelected = this.capotageSelected.concat(capotage);
      }
      else {
        const index = this.capotageSelected.indexOf(capotage);
        this.capotageSelected.splice(index, 1)
      }
      this.getAllProducts();
    }
  
    filterProductsByCapotage(products: Product[]): Product[] {
      if (this.refroidissementSelected.length > 0) {
        return products.filter(product => this.capotageSelected.includes(product.capotage));
      }
      else {
        return products;
      }
    }

                /* selection by capotages , 
    ajouter dans le tableau capotages et faire l'appel au service getAllProducts*/
    nombreHeuresSelected(event: Event, nombreHeure: string) {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        /* this.types.push(type) // pas la méme structure avec product.brand */
        this.nombreHeureSelected = this.nombreHeureSelected.concat(nombreHeure);
      }
      else {
        const index = this.nombreHeureSelected.indexOf(nombreHeure);
        this.nombreHeureSelected.splice(index, 1)
      }
      this.getAllProducts();
    }
  
    filterProductsBynombreHeures(products: Product[]): Product[] {
      if (this.refroidissementSelected.length > 0) {
        return products.filter(product => this.nombreHeureSelected.includes(product.nombreHeures));
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

  typeCarburantsSelected(event: Event, typeCarburant: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      /* this.types.push(type) // pas la méme structure avec product.brand */
      this.typeCarburantSelected = this.typeCarburantSelected.concat(typeCarburant);
    }
    else {
      const index = this.typeCarburantSelected.indexOf(typeCarburant);
      this.typeCarburantSelected.splice(index, 1)
    }
    this.getAllProducts();
  }

  filterProductsBytypeCarburant(products: Product[]): Product[] {
    if (this.typeCarburantSelected.length > 0) {
      return products.filter(product => this.typeCarburantSelected.includes(product.typeCarburant));
    }
    else {
      return products;
    }
  }

  vitesseMoteursSelected(event: Event, vitesseMoteur: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      /* this.types.push(type) // pas la méme structure avec product.brand */
      this.vitesseMoteurSelected = this.vitesseMoteurSelected.concat(vitesseMoteur);
    }
    else {
      const index = this.vitesseMoteurSelected.indexOf(vitesseMoteur);
      this.vitesseMoteurSelected.splice(index, 1)
    }
    this.getAllProducts();
  }

  filterProductsByvitesseMoteur(products: Product[]): Product[] {
    if (this.vitesseMoteurSelected.length > 0) {
      return products.filter(product => this.vitesseMoteurSelected.includes(product.vitesseMoteur));
    }
    else {
      return products;
    }
  }
  amperagesSelected(event: Event, amperage: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      /* this.types.push(type) // pas la méme structure avec product.brand */
      this.amperageSelected = this.amperageSelected.concat(amperage);
    }
    else {
      const index = this.amperageSelected.indexOf(amperage);
      this.amperageSelected.splice(index, 1)
    }
    this.getAllProducts();
  }

  filterProductsByamperage(products: Product[]): Product[] {
    if (this.amperageSelected.length > 0) {
      return products.filter(product => this.amperageSelected.includes(product.amperage));
    }
    else {
      return products;
    }
  }
  typeAlimentationsSelected(event: Event, typeAlimentation: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      /* this.types.push(type) // pas la méme structure avec product.brand */
      this.typeAlimentationSelected = this.typeAlimentationSelected.concat(typeAlimentation);
    }
    else {
      const index = this.typeAlimentationSelected.indexOf(typeAlimentation);
      this.typeAlimentationSelected.splice(index, 1)
    }
    this.getAllProducts();
  }

  filterProductsBytypeAlimentation(products: Product[]): Product[] {
    if (this.typeAlimentationSelected.length > 0) {
      return products.filter(product => this.typeAlimentationSelected.includes(product.typeAlimentation));
    }
    else {
      return products;
    }
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


}
