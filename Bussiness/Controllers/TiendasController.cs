using AutoMapper;
using Bussiness.DTOs;
using Entities.Entities;
using Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bussiness.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TiendasController : ControllerBase
{
    private readonly ITiendaRepository _repo;
    private readonly IMapper _mapper;

    public TiendasController(ITiendaRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }



    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // GET:  api/Tiendas/{id}
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<Tienda>>> GetTiendas()
    {
        var tiendas = await _repo.GetTiendasAsync();

        return Ok(tiendas);
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // GET:  api/Tiendas/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Tienda>> GetTienda(int id)
    {
        var tienda = await _repo.GetTiendaByIdAsync(id);

        return Ok(tienda);
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // POST:  api/Tiendas
    [HttpPost]
    public async Task<ActionResult<TiendaDto>> CreateTienda(TiendaCrearDto tiendaCrearDto)
    {
        var tienda = _mapper.Map<Tienda>(tiendaCrearDto);

        _repo.AddTienda(tienda);

        if (await _repo.SaveAllAsync())
        {
            return CreatedAtAction(nameof(GetTienda),
                new { id = tienda.Id }, _mapper.Map<TiendaDto>(tienda));
        }

        return BadRequest("No se pudo crear la tienda.");
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // DELETE:  api/Tiendas/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTienda(int id)
    {
        var tienda = await _repo.GetTiendaByIdAsync(id);

        if (tienda == null) return NotFound("No existe esa tienda.");

        _repo.DeleteTienda(tienda);

        if (await _repo.SaveAllAsync()) return Ok();

        return BadRequest("No se pudo borrar la tienda.");
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // PUT:  api/Tiendas
    [HttpPut]
    public async Task<ActionResult> UpdateTienda([FromBody]TiendaUpdateDto tiendaUpdateDto)
    {
        var tienda = await _repo.GetTiendaByIdAsync(tiendaUpdateDto.Id);

        if (tienda == null) return NotFound("No existe la tienda que intentas editar.");

        _mapper.Map(tiendaUpdateDto, tienda);

        if (await _repo.SaveAllAsync()) return NoContent();

        return BadRequest("No se pudo editar la tienda.");
    }
}
