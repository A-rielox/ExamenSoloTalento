namespace Bussiness.DTOs;

public class TiendaArticuloUpdateDto
{
    public int TiendaArticuloId { get; set; }


    public int StockInicial { get; set; }
    public int StockFinal { get; set; }

    public int ArticuloId { get; set; }
}
