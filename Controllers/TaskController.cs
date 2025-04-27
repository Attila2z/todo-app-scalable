using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult<List<TaskItem>> Get()
        {
            return _taskService.GetAll();
        }

        [HttpGet("feature-status")]
        public ActionResult<object> GetFeatureStatus()
        {
            bool enabled = _taskService.IsImportantFeatureEnabled();
            return Ok(new { importantFeatureEnabled = enabled });
        }

        [HttpPost]
        public ActionResult<TaskItem> Post([FromBody] TaskItem task)
        {
            var createdTask = _taskService.Add(task);
            return CreatedAtAction(nameof(Get), new { id = createdTask.Id }, createdTask);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = _taskService.Delete(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
