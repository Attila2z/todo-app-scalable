using TodoApi.Models;

namespace TodoApi.Services
{
    public class TaskService
    {
        private readonly List<TaskItem> _tasks = new();
        private int _nextId = 1;
        private readonly bool _importantFeatureEnabled;

        public TaskService()
        {
            var envValue = Environment.GetEnvironmentVariable("ENABLE_IMPORTANT_FEATURE");
            _importantFeatureEnabled = envValue == "true"; // default false
        }

        public List<TaskItem> GetAll()
        {
            return _tasks;
        }

        public TaskItem Add(TaskItem task)
        {
            task.Id = _nextId++;

            // Check if Important feature is enabled
            if (!_importantFeatureEnabled)
            {
                task.IsImportant = false; // Always false if feature is disabled
            }

            _tasks.Add(task);
            return task;
        }

        public bool Delete(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return false;
            _tasks.Remove(task);
            return true;
        }

        public bool IsImportantFeatureEnabled()
        {
            return _importantFeatureEnabled;
        }
    }}
