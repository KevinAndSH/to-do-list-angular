import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoInput: string = ""

  constructor(private todoService: TodoService) { }

  ngOnInit(): void { }

  addTodo(e: Event): void {
    e.preventDefault()
    const todoContent = this.todoInput.trim()
    if (!todoContent) return
    this.todoService.saveTodo(todoContent)
    this.todoInput = ""
  }
}
