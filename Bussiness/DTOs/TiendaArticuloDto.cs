namespace Bussiness.DTOs;

public class TiendaArticuloDto
{
    public int Id { get; set; }

    //////////////////////

    //public Articulo Articulo { get; set; }
    public int ArticuloId { get; set; } // el codigo
    public string Descripcion { get; set; }
    public int Stock { get; set; }

    public string Tipo { get; set; }
    public int TipoId { get; set; }

    /////////////////////

    //public Tienda Tienda { get; set; }
    public int TiendaId { get; set; }
    public string NombreSucursal { get; set; }
}
