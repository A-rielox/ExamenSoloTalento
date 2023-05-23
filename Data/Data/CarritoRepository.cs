using Entities.Entities;
using Entities.Interfaces;

namespace Data.Data;

public class CarritoRepository : ICarritoRepository
{
    private readonly StoreContext _context;

    public CarritoRepository(StoreContext context)
    {
        _context = context;
    }



    public void AddCarrito(Carrito carrito)
    {
        _context.Carritos.Add(carrito);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
