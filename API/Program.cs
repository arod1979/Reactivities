using Application.Activities.Queries;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
   opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")) ;
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddCors();
builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddIdentityApiEndpoints<User>( opt =>
{
   opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>();
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseAuthorization();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://localhost:3000"));

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
   var context = services.GetRequiredService<AppDbContext>();
   var userManager = services.GetRequiredService<UserManager<User>>();

   await context.Database.MigrateAsync();
   await DbInitializer.SeedData(context,userManager);
}
catch (Exception ex)
{
   var logger = services.GetRequiredService<ILogger<Program>>();
   logger.LogError(ex, "An error occurred during migration.");
}

app.Run();
