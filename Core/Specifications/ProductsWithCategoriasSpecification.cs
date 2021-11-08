using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithCategoriasSpecification : BaseSpecification<Product>
    {
        public ProductsWithCategoriasSpecification(ProductSpecParams productParams) 
            : base(x => (string.IsNullOrEmpty(productParams.Search) || x.Nome.ToLower().Contains(productParams.Search)) && 
                  (!productParams.CategoriaId.HasValue || x.ProductCategoriaId == productParams.CategoriaId))
        {
            AddInclude(x => x.ProductCategoria);
            AddOrderBy(x => x.Nome);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            if(!string.IsNullOrEmpty(productParams.Sort)){
                switch (productParams.Sort)
                {
                    case"priceAsc":
                        AddOrderBy(p => p.Preco);
                        break;
                    case"priceDesc":
                        AddorderByDescending(p => p.Preco);
                        break;
                    default:
                        AddOrderBy(p => p.Nome);
                        break;
                }
            }
        }

        public ProductsWithCategoriasSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductCategoria);
        }
    }
}