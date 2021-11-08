using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFilterForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFilterForCountSpecification(ProductSpecParams productParams) 
            : base(x => (string.IsNullOrEmpty(productParams.Search) || x.Nome.ToLower().Contains(productParams.Search)) && 
                  (!productParams.CategoriaId.HasValue || x.ProductCategoriaId == productParams.CategoriaId))
        {

        }
    }
}