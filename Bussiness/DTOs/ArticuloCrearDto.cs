using System.ComponentModel.DataAnnotations;

namespace Bussiness.DTOs;

public class ArticuloCrearDto
{
    [Required]
    public string Descripcion { get; set; }
    [Required]
    public int? Precio { get; set; }
    
    public string Imagen { get; set; }
    [Required]
    public int? Stock { get; set; }
    [Required]
    public int? TipoId { get; set; }
}
