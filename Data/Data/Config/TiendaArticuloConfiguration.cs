using Entities.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Data.Config;

public class TiendaArticuloConfiguration : IEntityTypeConfiguration<TiendaArticulo>
{
    public void Configure(EntityTypeBuilder<TiendaArticulo> builder)
    {
        builder.HasOne(ta => ta.Articulo)
               .WithMany(a => a.EnTiendas)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(ta => ta.Tienda)
               .WithMany(t => t.Stock)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
