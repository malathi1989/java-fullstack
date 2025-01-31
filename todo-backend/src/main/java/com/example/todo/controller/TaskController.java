package com.example.todo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.model.Task;
import com.example.todo.repository.TaskRepository;

@RestController
@CrossOrigin
@RequestMapping("/task")
public class TaskController {
	
	@Autowired
	private TaskRepository taskRepository;

	@GetMapping
	public List<Task> getTask() {
		return taskRepository.findAll();
	}
	
	@PostMapping
	public Task createTask(@RequestBody Task task) {
		taskRepository.save(task);
		return task;
	}
	
	@PutMapping("/{id}")
	public Task editTask(@PathVariable Long id, @RequestBody Task task){
         task.setId(id);
        return taskRepository.save(task);
   
	}
	
	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id){

          taskRepository.deleteById(id);
		
	}
}
