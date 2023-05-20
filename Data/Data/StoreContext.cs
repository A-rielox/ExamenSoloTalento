using Entities.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Data.Data;

public class StoreContext : DbContext
{
    public StoreContext(DbContextOptions options) : base(options)
    {
    }



    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    
    public DbSet<Tienda> Tiendas { get; set; }
    public DbSet<Articulo> Articulos { get; set; }
    public DbSet<Tipo> Tipos { get; set; }



    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // agarra la configuracion para la migracion de " ArticuloConfiguration " para mi Articulo
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        //    // xq Sqlite NO trabaja con " decimal ", los paso a " double " ( Si es Sqlite )
        //    if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
        //    {
        //        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        //        {
        //            var properties = entityType.ClrType.GetProperties()
        //                .Where(p => p.PropertyType == typeof(decimal));

        //            var dateTimeProperties = entityType.ClrType.GetProperties()
        //                .Where(p => p.PropertyType == typeof(DateTimeOffset));

        //            foreach (var property in properties)
        //            {
        //                modelBuilder.Entity(entityType.Name).Property(property.Name)
        //                    .HasConversion<double>();
        //            }

        //            //foreach (var property in dateTimeProperties)
        //            //{
        //            //    modelBuilder.Entity(entityType.Name).Property(property.Name)
        //            //        .HasConversion(new DateTimeOffsetToBinaryConverter());
        //            //}
        //        }
        //    }
    }
}
