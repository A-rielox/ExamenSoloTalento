using Entities.Entities;
using System.Text.Json;

namespace Data.Data;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context)
    {

        if (!context.Tipos.Any())
        {
            var tiposData = File.ReadAllText("../Data/Data/SeedData/tipos.json");
            var tipos = JsonSerializer.Deserialize<List<Tipo>>(tiposData);

            context.Tipos.AddRange(tipos);
        }

        if (!context.Tiendas.Any())
        {
            var tiendasData = File.ReadAllText("../Data/Data/SeedData/tiendas.json");
            var tiendas = JsonSerializer.Deserialize<List<Tienda>>(tiendasData);

            context.Tiendas.AddRange(tiendas);
        }

        if (!context.Articulos.Any())
        {
            var articulosData = File.ReadAllText("../Data/Data/SeedData/articulos.json");
            var articulos = JsonSerializer.Deserialize<List<Articulo>>(articulosData);

            context.Articulos.AddRange(articulos);
        }




        if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
    }
}
