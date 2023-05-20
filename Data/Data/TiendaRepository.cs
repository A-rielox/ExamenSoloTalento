using Entities.Entities;
using Entities.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Data;

public class TiendaRepository : ITiendaRepository
{
    private readonly StoreContext _context;

    public TiendaRepository(StoreContext context)
    {
        _context = context;
    }



    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public async Task<Tienda> GetTiendaByIdAsync(int id)
    {
        var tienda = await _context.Tiendas.FindAsync(id);

        return tienda;
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public async Task<IReadOnlyList<Tienda>> GetTiendasAsync()
    {
        var tiendas = await _context.Tiendas.ToListAsync();

        return tiendas;
    }
    
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public void AddTienda(Tienda tienda)
    {
        _context.Tiendas.Add(tienda);
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public void DeleteTienda(Tienda tienda)
    {
        _context.Tiendas.Remove(tienda);
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
