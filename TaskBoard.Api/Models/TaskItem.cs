using System.ComponentModel.DataAnnotations;

namespace TaskBoard.Api.Models;

public class TaskItem
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }

    [RegularExpression("ToDo|InProgress|Done")]
    public string Status { get; set; } = "ToDo";

    [RegularExpression("Low|Medium|High")]
    public string Priority { get; set; } = "Medium";

    public DateTime? DueDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}