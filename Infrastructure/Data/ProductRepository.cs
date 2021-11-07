using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;

        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<Product>> GetProductAsync()
        {
            return await _context.Products.Include(p => p.ProductCategoria).ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.Include(p => p.ProductCategoria).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<ProductCategoria>> GetProductCategoriaAsync()
        {
            return await _context.ProductCategoria.ToListAsync();
        }
    }
}