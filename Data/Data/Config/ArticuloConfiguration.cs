using Entities.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Data.Config;

internal class ArticuloConfiguration : IEntityTypeConfiguration<Articulo>
{
    public void Configure(EntityTypeBuilder<Articulo> builder)
    {
        builder.Property(a => a.Codigo).IsRequired();
        builder.Property(a => a.Precio).IsRequired();
        builder.Property(a => a.Stock).IsRequired();

        builder.HasOne(a => a.Tipo)
               .WithMany()
               .HasForeignKey(a => a.TipoId);
    }
}

/*
public int Codigo { get; set; }
public string Descripcion { get; set; }
public int Precio { get; set; }
public string Imagen { get; set; }
public int Stock { get; set; }
public int TipoId { get; set; }
*/