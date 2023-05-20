using System.ComponentModel.DataAnnotations;

namespace Entities.Entities;

public class Articulo : BaseEntity
{
    [Key]
    public int Codigo { get; set; }

    
    public string Descripcion { get; set; }    
    public int Precio { get; set; }
    public string Imagen { get; set; }
    public int Stock { get; set; }


    public Tipo Tipo { get; set; }
    public int TipoId { get; set; }
}
    