import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICategoria } from '../shared/models/categoria';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  getProducts(categoriaId?: number, sort?: string, pageNumber?: number, pageSize?: number, search?: string) {
    let params = new HttpParams();

    if(categoriaId){
      params = params.append('categoriaId', categoriaId.toString());
    }

    if(sort){
      params = params.append('sort', sort);
    }

      params = params.append('pageIndex', pageNumber!.toString());

      params = params.append('pageSize', pageSize!);

    if(search!=""){
      if(search){
        params = params.append('search', search!.toString());
      }
    }
    
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(map(response => {
      return response.body;
    }));
  }

  getCategorias(){
    return this.http.get<ICategoria[]>(this.baseUrl + 'products/categorias');
  }

}
