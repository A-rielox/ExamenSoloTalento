using Entities.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Data.Identity;

public class AppIdentityDbContextSeed
{
    public static async Task SeedUsersAsync(UserManager<Cliente> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new Cliente
            {
                Nombre = "Clark",
                Apellidos = "Kent",
                Direccion = "Kripton #123"
            };

            await userManager.CreateAsync(user, "P@ssword1");
        }
    }
}
