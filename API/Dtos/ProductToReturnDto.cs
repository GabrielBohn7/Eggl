using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string UnidadeMedida { get; set; }
        public decimal Preco { get; set; }
        public decimal Peso { get; set; }
        public string ProductCategoria { get; set; }
        public string CodProduto { get; set; }
        public string PictureUrl { get; set; }
    }
}