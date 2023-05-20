using AutoMapper;
using Bussiness.DTOs;
using Entities.Entities;
using Entities.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bussiness.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticulosController : ControllerBase
{
    private readonly IArticuloRepository _repo;
    private readonly IMapper _mapper;

    public ArticulosController(IArticuloRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }



    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // GET:  api/Articulos
    [HttpGet]
    public async Task<ActionResult<List<ArticuloDto>>> GetArticulos()
    {
        var articulos = await _repo.GetArticulosAsync();

        var data = _mapper.Map<List<ArticuloDto>>(articulos);

        return Ok(data);
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // GET:  api/Articulos/{codigo}
    [HttpGet("{codigo}")]
    public async Task<ActionResult<ArticuloDto>> GetArticulo(int codigo)
    {
        var articulo = await _repo.GetArticuloByCodigoAsync(codigo);

        if (articulo == null) return NotFound("No existe este artículo.");

        var data = _mapper.Map<ArticuloDto>(articulo);

        return Ok(data);
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // POST:  api/Articulos
    [HttpPost]
    public async Task<ActionResult<ArticuloDto>> CreateArticulo(ArticuloCrearDto articuloCrearDto)
    {
        var articulo = _mapper.Map<Articulo>(articuloCrearDto);

        _repo.AddArticulo(articulo);

        if(await _repo.SaveAllAsync())
        {
            return CreatedAtAction(nameof(GetArticulo),
                new {codigo = articulo.Codigo }, _mapper.Map<ArticuloDto>(articulo));
        }

        return BadRequest("No se pudo crear el artículo.");
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // DELETE:  api/Articulos/{codigo}
    [HttpDelete("{codigo}")]
    public async Task<ActionResult> DeleteArticulo(int codigo)
    {
        var articulo = await _repo.GetArticuloByCodigoAsync(codigo);

        if (articulo == null) return NotFound("No existe ese artículo.");

        _repo.DeleteArticulo(articulo);

        if (await _repo.SaveAllAsync()) return Ok();

        return BadRequest("No se pudo borrar el artículo.");
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // PUT:  api/Articulos
    [HttpPut]
    public async Task<ActionResult> UpdateArticulo([FromBody]ArticuloUpdateDto articuloUpdateDto)
    {
        var articulo = await _repo.GetArticuloByCodigoAsync(articuloUpdateDto.Codigo);

        if(articulo == null) return NotFound("No existe el artículo que intentas editar.");

        _mapper.Map(articuloUpdateDto, articulo);

        if (await _repo.SaveAllAsync()) return NoContent();

        return BadRequest("No se pudo editar el artículo.");
    }



    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    [HttpGet("tipos")]
    public async Task<ActionResult<List<Tipo>>> GetTiposDeArticulos()
    {
        var tipos = await _repo.GetTiposAsync();

        return Ok(tipos);
    }
}
