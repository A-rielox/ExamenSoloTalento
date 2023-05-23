using Entities.Entities;

namespace Entities.Interfaces
{
    public interface ICarritoRepository
    {
        void AddCarrito(Carrito carrito);

        Task<bool> SaveAllAsync();
    }
}
