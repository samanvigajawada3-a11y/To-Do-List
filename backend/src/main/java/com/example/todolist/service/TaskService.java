package com.example.todolist.service;

import com.example.todolist.model.Task;
import com.example.todolist.repository.TaskRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TaskService {
    private final TaskRepository repository;
    public TaskService(TaskRepository repository) { this.repository = repository; }
    public List<Task> findAll() { return repository.findAll(); }
    public Task create(Task task) { task.setId(null); return repository.save(task); }
    public Task update(String id, Task changes) {
        Task task = getOrThrow(id);
        task.setTitle(changes.getTitle());
        task.setDescription(changes.getDescription());
        task.setStatus(changes.getStatus());
        task.setDueDate(changes.getDueDate());
        return repository.save(task);
    }
    public void delete(String id) { repository.delete(getOrThrow(id)); }
    private Task getOrThrow(String id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }
}
