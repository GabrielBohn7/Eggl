import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/products';
import { IPagination } from '../shared/models/pagination';
import { ShopService } from './shop.service';
import { ICategoria } from '../shared/models/categoria';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products!: IProduct[];
  categorias!: ICategoria[];
  categoriaIdSelecionada: number = 0;
  sortSelected = 'nome';
  sortOptions = [
    {nome: 'Alfabética', value: 'nome'},
    {nome: 'Preço: Menor para Maior', value: 'priceAsc'},
    {nome: 'Preço: Maior para Menor', value: 'priceDesc'}
  ];
  pageNumber = 2;
  pageSize = 2;
  totalCount!: number;
  @ViewChild('search', {static: true}) searchTerm!: ElementRef;
  search!: string;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategorias();
  }

  getProducts(){
    this.shopService.getProducts(this.categoriaIdSelecionada, this.sortSelected, this.pageNumber, this.pageSize, this.search).subscribe(response =>{
      this.products = response!.data;
      this.pageNumber = response?.pageIndex!;
      this.pageSize = response?.pageSize!;
      this.totalCount = response?.count!;
     }, error => {
       console. log (error);
     });
  }

  getCategorias(){
    this.shopService.getCategorias().subscribe(response =>{
      this.categorias = [{id: 0, nome: "TODAS"}, ...response]; //Adiciona "Todos" no array de categorias
     }, error => {
       console. log (error);
     });
  }

  onCategoriaSelecionada(categoriaId: number){
    this.categoriaIdSelecionada = categoriaId;
    this.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.sortSelected = sort;
    this.getProducts();
  }

  onPageChanged(event: any){
    this.pageNumber = event.page;
    this.getProducts()
  }

  onSearch(){
    this.search = this.searchTerm.nativeElement.value;
    this.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = "";
    this.search = "";
    this.getProducts();
  }
}
