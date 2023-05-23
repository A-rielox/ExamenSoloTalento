using Bussiness.Extensions;
using Data.Data;
using Data.Identity;
using Data.Services;
using Entities.Entities.Identity;
using Entities.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();





// p' ocupar mi extension con los servicios
// builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
// builder.Services.AddSwaggerDocumentation();




// sqlite - connection string
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});





// para mi inyeccion de dependencia
builder.Services.AddScoped<IArticuloRepository, ArticuloRepository>();
builder.Services.AddScoped<ITiendaRepository, TiendaRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ITiendaArticuloRepository, TiendaArticuloRepository>();
builder.Services.AddScoped<ICarritoRepository, CarritoRepository>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());



builder.Services.AddCors();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();




app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();







// para q actualice la db cada q empiece y aplique migraciones pendientes
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();
var identityContext = services.GetRequiredService<AppIdentityDbContext>();
var userManager = services.GetRequiredService<UserManager<Cliente>>();
var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    await identityContext.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context);
    await AppIdentityDbContextSeed.SeedUsersAsync(userManager);
}
catch (Exception ex)
{
    logger.LogError(ex, "Ocurrió un error durante la migración.");
}








app.Run();

