
using Entities.Entities;

namespace Entities.Interfaces;

public interface ITiendaArticuloRepository
{
    void AddTiendaArticulo(TiendaArticulo tiendaArticulo);

    void DeleteTiendaArticulo(TiendaArticulo tiendaArticulo);

    void UpdateTiendaArticulo(TiendaArticulo tiendaArticulo);


    Task<TiendaArticulo> GetTiendaArticuloByCodigoAsync(int id);

    Task<List<TiendaArticulo>> GetAllTiendaArticulosAsync(int tiendaId);



    Task<bool> SaveAllAsync();
}
