﻿using AutoMapper;
using Bussiness.DTOs;
using Entities.Entities;

namespace Bussiness.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Articulo, ArticuloDto>()
                 .ForMember(dest => dest.Tipo, opt => opt.MapFrom(src => 
                                                      src.Tipo.Name))
                 .ReverseMap();
        CreateMap<Articulo, ArticuloCrearDto>().ReverseMap();
        CreateMap<Articulo, ArticuloUpdateDto>().ReverseMap();



        CreateMap<Tienda, TiendaDto>().ReverseMap();
        CreateMap<Tienda, TiendaCrearDto>().ReverseMap();
        CreateMap<Tienda, TiendaUpdateDto>().ReverseMap();


        CreateMap<TiendaArticulo, TiendaArticuloCrearDto>()
                 .ForMember(dest => dest.StockAdded, opt => opt.MapFrom(src => 
                                                            src.TiendaArticuloStock))
                 .ReverseMap();
        CreateMap<TiendaArticulo, TiendaArticuloDto>()
                 .ForMember(dest => dest.Stock, opt => opt.MapFrom(src =>
                                                            src.TiendaArticuloStock))
                 .ForMember(dest => dest.Descripcion, opt => opt.MapFrom(src =>
                                                             src.Articulo.Descripcion))
                 .ReverseMap();


        CreateMap<Carrito, CarritoCreateDto>().ReverseMap();
    }
}
