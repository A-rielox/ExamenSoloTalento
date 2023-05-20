using System.ComponentModel.DataAnnotations;

namespace Bussiness.DTOs;

public class ArticuloUpdateDto
{
    [Required]
    public int Codigo { get; set; }
    [Required]
    public string Descripcion { get; set; }
    [Required]
    public int? Precio { get; set; }
    [Required]
    public string Imagen { get; set; }
    [Required]
    public int? Stock { get; set; }
    [Required]
    public int? TipoId { get; set; }
}
