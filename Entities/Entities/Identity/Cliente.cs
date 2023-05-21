using Microsoft.AspNetCore.Identity;

namespace Entities.Entities.Identity;

public class Cliente : IdentityUser
{
    public string Nombre { get; set; }
    public string Apellidos { get; set; }
    public string Direccion { get; set; }
}
