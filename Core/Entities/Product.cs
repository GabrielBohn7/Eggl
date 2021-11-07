using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string Nome { get; set; }
        public string UnidadeMedida { get; set; }
        public decimal Preco { get; set; }
        public decimal Peso { get; set; }
        public ProductCategoria ProductCategoria { get; set; }
        public int ProductCategoriaId { get; set; }
        public string CodProduto { get; set; }
        public string PictureUrl { get; set; }



    // nome: string;
    // preco: string; 
    // peso: string; 
    // unidade_medida: string; 
    // categoria: string; 
    // cod_produto: string
    // Picture URL
    }
}