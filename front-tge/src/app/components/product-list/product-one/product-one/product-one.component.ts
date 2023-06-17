import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-one',
  templateUrl: './product-one.component.html',
  styleUrls: ['./product-one.component.css']
})
export class ProductOneComponent {

  reduction : any = 0;
  @Input() public product: any;
  
  constructor(private router: Router){}
  PhotosOrder(i:number): any{
    switch(i+1){
      case 1:
        return "img-first";
      case 2:
        return "img-second";
    }
  }
  ngOnInit(){
    if (this.product.discountedPrice != 0) {
      this.reduction = Math.floor(((this.product.price - this.product.discountedPrice) * 100)/ this.product.price);
    }
    
  }
  showProduct(id:number){
    this.router.navigate([`single/${id}`]);
  }
}
