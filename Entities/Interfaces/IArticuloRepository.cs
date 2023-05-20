using Entities.Entities;

namespace Entities.Interfaces;

public interface IArticuloRepository
{
    Task<Articulo> GetArticuloByCodigoAsync(int codigo);

    Task<IReadOnlyList<Articulo>> GetArticulosAsync();

    Task<IReadOnlyList<Tipo>> GetTiposAsync();

    void AddArticulo(Articulo articulo);

    void DeleteArticulo(Articulo articulo);

    Task<bool> SaveAllAsync();
}
