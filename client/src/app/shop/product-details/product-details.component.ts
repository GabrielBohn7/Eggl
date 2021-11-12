import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/products';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  id!: Number;
  quantidade = 1;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, private bcService: BreadcrumbService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product, this.quantidade);
  }

  incrementQuantidade(){
    this.quantidade++;
  }

  decrementQuantidade(){
    if(this.quantidade > 1){
      this.quantidade--;
    }
  }

  loadProduct(){
    this.id = this.activateRoute.snapshot.params['id'];
    this.shopService.getProduct(+this.id).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.nome)
    }, error => {
      console.log(error)
    })
  }

}
