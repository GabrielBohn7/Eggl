import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { IProduct } from './shared/models/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Eggl';

  constructor(private http: HttpClient, private basketService: BasketService) {}

  ngOnInit(): void {
    // this.http.get('http://localhost:5000/api/Basket?id=basket1').subscribe((response: any) => {
    //   console.log(response);
    // }, error => {
    //   console.log(error);
    // });
    const basketId = localStorage.getItem('basket_id');
    if (basketId){
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('Initialized basket');
      }, error => {
        console.log(error);
      })
    }
  }


}
