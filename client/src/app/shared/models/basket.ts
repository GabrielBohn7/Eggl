import { v4 as uuidv4 } from 'uuid';

export interface IBasketItem {
    id: number;
    productNome: string;
    preco: number;
    quantidade: number;
    pictureUrl: string;
    categoria: string;
}

export interface IBasket {
    id: string;
    productId: number;
    item: IBasketItem[];
}

export class Basket implements IBasket{
    id = uuidv4()
    productId: number = 1;
    item: IBasketItem[] = [];
}

export interface IBasketTotals{
    subTotal: number;
    total: number;
    shipping: number;
}