namespace TodoApi.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsImportant { get; set; } = false; // Feature toggle later
    }
}
