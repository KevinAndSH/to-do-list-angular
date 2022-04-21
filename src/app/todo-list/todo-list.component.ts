import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';
import { Todo } from '../types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  private _todos: Todo[] = []
  hideCompleted = false

  private todoSubscription: Subscription

  constructor(private todoService: TodoService) {
    this.todoSubscription = this.todoService.observe().subscribe(todos => {
      this._todos = todos
    })
  }

  get todos() {
    if (!this.hideCompleted) return this._todos
    return this._todos.filter(todo => !todo.isCompleted)
  }

  ngOnInit(): void {
    this._todos = this.todoService.todos
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe()
  }
}
