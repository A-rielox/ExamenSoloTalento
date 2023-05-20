using Entities.Entities;

namespace Entities.Interfaces;

public interface ITiendaRepository
{
    Task<Tienda> GetTiendaByIdAsync(int id);

    Task<IReadOnlyList<Tienda>> GetTiendasAsync();

    // getArticulosEnTienda

    void AddTienda(Tienda articulo);

    void DeleteTienda(Tienda articulo);

    Task<bool> SaveAllAsync();
}
