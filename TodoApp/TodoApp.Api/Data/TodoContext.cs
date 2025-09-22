using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Models;

namespace TodoApp.Api.Data
{
    public class  TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options){ }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}