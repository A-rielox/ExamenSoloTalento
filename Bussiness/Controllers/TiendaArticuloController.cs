using AutoMapper;
using Bussiness.DTOs;
using Entities.Entities;
using Entities.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bussiness.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TiendaArticuloController : ControllerBase
{
    private readonly ITiendaArticuloRepository _repo;
    private readonly IMapper _mapper;

    public TiendaArticuloController(ITiendaArticuloRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }




    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // POST:  api/TiendaArticulo
    [HttpPost]
    public async Task<ActionResult> CreateTiendaArticulo(TiendaArticuloCrearDto createDto)
    {
        var tiendaArticulo = _mapper.Map<TiendaArticulo>(createDto);

        _repo.AddTiendaArticulo(tiendaArticulo);

        if(await _repo.SaveAllAsync()) return Ok();
        

        return BadRequest("Problemas añadiendo artículo.");
    }


    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // DELETE:  api/TiendaArticulo/{id}
    // id de TiendaArticulo
    // va a faltar devolver los articulos al stock general
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTiendaArticulo(int id)
    {
        var tiendaArticulo = await _repo.GetTiendaArticuloByCodigoAsync(id);

        if (tiendaArticulo == null) return NotFound("No existe ese item.");

        _repo.DeleteTiendaArticulo(tiendaArticulo);

        if (await _repo.SaveAllAsync()) return Ok();

        return BadRequest("No se pudo borrar el item.");
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET:  api/TiendaArticulo/{tiendaId}
    // para obtener todos los articulos en UNA tienda ( para el front de  comprar )
    [HttpGet("{tiendaId}")]
    public async Task<ActionResult<List<TiendaArticuloDto>>> GetAllTiendaArticulo(int tiendaId)
    {
        var tiendaArticulosList = await _repo.GetAllTiendaArticulosAsync(tiendaId);

        var tiendaArticuloDtoList = _mapper.Map<List<TiendaArticuloDto>>(tiendaArticulosList);

        return Ok(tiendaArticuloDtoList);
    }
}
