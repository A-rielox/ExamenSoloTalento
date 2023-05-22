namespace Bussiness.DTOs;

public class TiendaArticuloCrearDto
{
    public int ArticuloId { get; set; } // el codigo
    public string Tipo { get; set; }
    public int TipoId { get; set; }

    //////////////////////////////////////

    public int TiendaId { get; set; }
    public string NombreSucursal { get; set; }

    //////////////////////////////////////

    public int StockAdded { get; set; }
}
