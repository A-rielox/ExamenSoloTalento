using Entities.Entities;
using Entities.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Data;

public class TiendaArticuloRepository : ITiendaArticuloRepository
{
    private readonly StoreContext _context;

    public TiendaArticuloRepository(StoreContext context)
    {
        _context = context;
    }



    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async void AddTiendaArticulo(TiendaArticulo tiendaArticulo)
    {
        // para rebajar el stock del articulo
        var articulo = await _context.Articulos
                                     .Where(a => a.Codigo == tiendaArticulo.ArticuloId)
                                     .FirstOrDefaultAsync();
        articulo.Stock -= tiendaArticulo.TiendaArticuloStock;


        _context.TiendaArticulos.Add(tiendaArticulo);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void DeleteTiendaArticulo(TiendaArticulo tiendaArticulo)
    {
        _context.TiendaArticulos.Remove(tiendaArticulo);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<TiendaArticulo> GetTiendaArticuloByIdAsync(int id)
    {
        var tiendaArticulo = await _context.TiendaArticulos
                                           .FirstOrDefaultAsync(ta => ta.Id == id);
        
        return tiendaArticulo;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // PARA AGARRAR TODOS LOS ARTICULOS EN UNA TIENDA en controller devulvo TiendaArticuloDto
    public async Task<List<TiendaArticulo>> GetAllTiendaArticulosAsync(int tiendaId)
    {
        var tiendaArticulos = await _context.TiendaArticulos
                                            .Include(ta => ta.Articulo)
                                            .Where(ta => ta.TiendaId == tiendaId)
                                            .ToListAsync();

        return tiendaArticulos;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async void UpdateTiendaArticulo(TiendaArticulo tiendaArticulo, int stockInicial,
                                     int stockFinal, int articuloId)
    {
        var articulo = await _context.Articulos
                                     .FirstOrDefaultAsync(a => a.Codigo == articuloId);
        
        if(stockInicial > stockFinal)
        {
            articulo.Stock += stockInicial - stockFinal; 
        }
        
        if (stockFinal > stockInicial)
        {
            articulo.Stock -= stockFinal - stockInicial;
        }

        tiendaArticulo.TiendaArticuloStock = stockFinal;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

}
