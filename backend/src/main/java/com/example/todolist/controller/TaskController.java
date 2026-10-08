package com.example.todolist.controller;

import com.example.todolist.model.Task;
import com.example.todolist.service.TaskService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService service;
    public TaskController(TaskService service) { this.service = service; }
    @GetMapping public List<Task> all() { return service.findAll(); }
    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public Task create(@Valid @RequestBody Task task) { validateStatus(task); return service.create(task); }
    @PutMapping("/{id}")
    public Task update(@PathVariable String id, @Valid @RequestBody Task task) { validateStatus(task); return service.update(id, task); }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) { service.delete(id); }
    private void validateStatus(Task task) {
        if (task.getStatus() == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status must be PENDING or COMPLETED");
    }
}
