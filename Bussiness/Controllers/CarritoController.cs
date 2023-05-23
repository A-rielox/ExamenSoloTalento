using API.Extensions;
using AutoMapper;
using Bussiness.DTOs;
using Data.Identity;
using Entities.Entities;
using Entities.Entities.Identity;
using Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Bussiness.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarritoController : ControllerBase
{
    private readonly UserManager<Cliente> _userManager;
    private readonly ICarritoRepository _repo;
    private readonly IMapper _mapper;

    public CarritoController(UserManager<Cliente> userManager, 
                             ICarritoRepository repo,
                             IMapper mapper)
    {
        _userManager = userManager;
        _repo = repo;
        _mapper = mapper;
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // POST:  api/Carrito
    [Authorize]
    [HttpPost("{email}")]
    public async Task<ActionResult> CreateCarrito([FromBody]CarritoCreateDto carritoStr,string email)
    {
        var carrito = _mapper.Map<Carrito>(carritoStr);

        _repo.AddCarrito(carrito);

        if (await _repo.SaveAllAsync()) return Ok();
        
        return BadRequest("No se pudo crear la tienda.");
    }
}
