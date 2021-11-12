import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = 'https://localhost:5001/api/';
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string){
    console.log(this.baseUrl + 'basket?id=' + id);
    return this.http.get(this.baseUrl + 'basket?id=' + id)
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket){
    console.log(basket);
    //return this.http.post('https://basket.requestcatcher.com', basket).subscribe((response: IBasket) => {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      console.log(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantidade = 1){
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantidade);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.item = this.addOrUpdateItem(basket.item, itemToAdd, quantidade);
    basket.productId = item.id;
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.item.findIndex(x => x.id === item.id);
    basket.item[foundItemIndex].quantidade++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.item.findIndex(x => x.id === item.id);
    if (basket.item[foundItemIndex].quantidade > 1){
      basket.item[foundItemIndex].quantidade--;
      this.setBasket(basket);
    }
    else{
      this.removeItemFromBasket(item);
    }
    
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket.item.some(x => x.id === item.id)){
      basket.item = basket.item.filter(i => i.id !== item.id);
      if(basket.item.length > 0){
        this.setBasket(basket);
      }
      else{
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error =>{
      console.log(error);
    })
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantidade: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1){
      itemToAdd.quantidade = quantidade;
      items.push(itemToAdd);
    }
    else{
      items[index].quantidade += quantidade;
    }
    return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: IProduct, quantidade: number): IBasketItem {
    return {
      id: item.id,
      productNome: item.nome,
      preco: item.preco,
      pictureUrl: item.pictureUrl,
      quantidade,
      categoria: item.productCategoria
    }
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subTotal = basket.item.reduce((a,b) => (b.preco*b.quantidade) + a,0);
    const total = subTotal + shipping;
    this.basketTotalSource.next({shipping, total, subTotal})
  }


}


