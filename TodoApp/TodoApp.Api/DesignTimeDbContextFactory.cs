using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using TodoApp.Api.Data;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<TodoContext>
{
    public TodoContext CreateDbContext(string[] args)
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../TodoApp.Api"))
            .AddJsonFile("appsettings.json")
            .Build();

        var connectionString = builder.GetConnectionString("DefaultConnection");

        var optionsBuilder = new DbContextOptionsBuilder<TodoContext>();
        optionsBuilder.UseSqlite(connectionString);

        return new TodoContext(optionsBuilder.Options);
    }
}