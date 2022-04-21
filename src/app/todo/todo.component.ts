import { Component, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  @Input() todo: Todo = {
    id: "",
    content: "",
    isCompleted: false
  }

  constructor(private todoService: TodoService) { }

  toggleCompleted() {
    this.todoService.toggleCompletedById(this.todo.id)
  }

  deleteTodo() {
    this.todoService.deleteTodoById(this.todo.id)
  }
}
