using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Nome).IsRequired().HasMaxLength(255);
            builder.Property(p => p.UnidadeMedida).IsRequired().HasMaxLength(255);
            builder.Property(p => p.Preco).HasColumnType("decimal(18,2)");
            builder.HasOne(p => p.ProductCategoria).WithMany().HasForeignKey(p => p.ProductCategoriaId);
        }
    }
}