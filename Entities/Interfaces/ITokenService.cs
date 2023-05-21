using Entities.Entities.Identity;

namespace Entities.Interfaces;

public interface ITokenService
{
    string CreateToken(Cliente cliente);
}
