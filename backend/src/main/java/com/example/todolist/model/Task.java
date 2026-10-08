package com.example.todolist.model;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Document(collection = "Tasks")
public class Task {
    @Id
    private String id;
    @NotBlank(message = "Title is required")
    @Size(max = 120, message = "Title must be 120 characters or fewer")
    private String title;
    @Size(max = 2000, message = "Description must be 2000 characters or fewer")
    private String description;
    private TaskStatus status = TaskStatus.PENDING;
    private LocalDate dueDate;

    public Task() {}
    public Task(String id, String title, String description, TaskStatus status, LocalDate dueDate) {
        this.id = id; this.title = title; this.description = description;
        this.status = status == null ? TaskStatus.PENDING : status; this.dueDate = dueDate;
    }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status == null ? TaskStatus.PENDING : status; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
}
