using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            return await _context.TodoItems.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodoItems), new { id = todoItem.Id }, todoItem);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutTodoItem(int id, TodoItem todoItem)
        {           
            if (id != todoItem.Id)
            {
                return BadRequest(new { message = "O ID na URL não corresponde ao ID do item no corpo da requisição." });
            }

            var existingItem = await _context.TodoItems.FindAsync(id);
            if (existingItem == null)
            {
                return NotFound(new { message = "Item de tarefa não encontrado." });
            }

            existingItem.Name = todoItem.Name;
            existingItem.IsComplete = todoItem.IsComplete;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Ocorreu um erro ao salvar as alterações no banco de dados.", error = ex.InnerException?.Message });
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodoItem(int id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound(new { message = "Item de tarefa não encontrado." });
            }
            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}