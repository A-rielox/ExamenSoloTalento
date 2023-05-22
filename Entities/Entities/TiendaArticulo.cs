namespace Entities.Entities;

public class TiendaArticulo
{
    public int Id { get; set; }

    //////////////////////

    public Articulo Articulo { get; set; }
    public int ArticuloId { get; set; } // el codigo
    public string Tipo { get; set; }
    public int TipoId { get; set; }

    /////////////////////

    public Tienda Tienda { get; set; }
    public int TiendaId { get; set; }
    public string NombreSucursal { get; set; }

    /////////////////////

    public int TiendaArticuloStock { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.Now;
}
