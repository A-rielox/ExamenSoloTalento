using AutoMapper;
using Bussiness.DTOs;
using Entities.Entities.Identity;
using Entities.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Bussiness.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly UserManager<Cliente> _userManager;
    private readonly SignInManager<Cliente> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public ClientesController(UserManager<Cliente> userManager,
                              SignInManager<Cliente> signInManager,
                              ITokenService tokenService,
                              IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _mapper = mapper;
    }


    /////////////////////////////////////////
    /////////////////////////////////////////
    // POST: Clientes/login 
    [HttpPost("login")]
    public async Task<ActionResult<ClientDto>> Login(LoginDto loginDto)
    {
        var cliente = await _userManager.FindByEmailAsync(loginDto.Email);

        //if (cliente == null) return Unauthorized(new ApiResponse(401));
        if (cliente == null) return Unauthorized("El usuario no existe");

        var result = await _signInManager.CheckPasswordSignInAsync(cliente, loginDto.Password, false);

        //if (!result.Succeeded) return Unauthorized(new ApiResponse(401));
        if (!result.Succeeded) return Unauthorized("Credenciales invalidas");

        return new ClientDto
        {
            Email = cliente.Email,
            Nombre = cliente.Nombre,
            Direccion = cliente.Direccion,
            Token = _tokenService.CreateToken(cliente),
        };
    }

    /////////////////////////////////////////
    /////////////////////////////////////////
    // POST: Clientes/register
    [HttpPost("register")]
    public async Task<ActionResult<ClientDto>> Register(RegisterDto registerDto)
    {
        //if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
        //{
        //    return new BadRequestObjectResult(new ApiValidationErrorResponse
        //    {
        //        Errors = new[] { "Email is already taken." }
        //    });
        //}

        var cliente = new Cliente
        {
            Email = registerDto.Email,
            Nombre = registerDto.Nombre,
            Direccion = registerDto.Direccion,
            UserName = registerDto.Email, // lo requiere Identity
        };

        var result = await _userManager.CreateAsync(cliente, registerDto.Password);

        //if (!result.Succeeded) return BadRequest(new ApiResponse(400));
        if (!result.Succeeded) return BadRequest("Problemas al crear el cliente.");

        return new ClientDto
        {
            Email = cliente.Email,
            Nombre = cliente.Nombre,
            Direccion = cliente.Direccion,
            Token = _tokenService.CreateToken(cliente),
        };
    }
}
