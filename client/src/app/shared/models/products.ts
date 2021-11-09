// export interface IProduct{
//     nome: string;
//     preco: string; 
//     peso: string; 
//     unidade_medida: string; 
//     categoria: string; 
//     cod_produto: string
// }

export interface IProduct {
    id: number;
    nome: string;
    unidadeMedida: string;
    preco: number;
    peso: number;
    productCategoria: string;
    codProduto: string;
    pictureUrl: string;
}