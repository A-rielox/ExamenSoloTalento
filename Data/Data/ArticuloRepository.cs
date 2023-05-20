using Entities.Entities;
using Entities.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Data;

public class ArticuloRepository : IArticuloRepository
{
    private readonly StoreContext _context;

    public ArticuloRepository(StoreContext context)
    {
        _context = context;
    }



    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public async Task<Articulo> GetArticuloByCodigoAsync(int codigo)
    {
        var articulo = await _context.Articulos
                                     .Include(a => a.Tipo)
                                     .FirstOrDefaultAsync(a => a.Codigo == codigo);
        
        return articulo;
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public async Task<IReadOnlyList<Articulo>> GetArticulosAsync()
    {
        return await _context.Articulos
                             .Include(a => a.Tipo)
                             .ToListAsync();
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public void AddArticulo(Articulo articulo)
    {
        _context.Articulos.Add(articulo);
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public void DeleteArticulo(Articulo articulo)
    {
        _context.Articulos.Remove(articulo);
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public async Task<IReadOnlyList<Tipo>> GetTiposAsync()
    {
        return await _context.Tipos.ToListAsync();
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
