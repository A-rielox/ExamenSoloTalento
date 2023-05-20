using System.ComponentModel.DataAnnotations;

namespace Bussiness.DTOs;

public class TiendaUpdateDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Sucursal { get; set; }

    [Required]
    public string Direccion { get; set; }
}
