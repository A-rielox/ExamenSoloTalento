using System.ComponentModel.DataAnnotations;

namespace Bussiness.DTOs;

public class TiendaCrearDto
{
    [Required]
    public string Sucursal { get; set; }

    [Required]
    public string Direccion { get; set; }
}
