import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid'
import { Todo } from './types';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  STORAGE_KEY = "todos"

  private _todos: Todo[]
  private _todoSubject: BehaviorSubject<Todo[]>

  constructor() {
    this._todos = JSON.parse(localStorage.getItem(this.STORAGE_KEY)!) || []
    this._todoSubject = new BehaviorSubject([] as Todo[])
  }

  get todos() {
    return this._todos
  }

  observe() {
    return this._todoSubject.asObservable()
  }

  private update() {
    this._todoSubject.next(this._todos)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos))
  }

  saveTodo(todoContent: string) {
    const newTodo: Todo = {
      id: uuid(),
      content: todoContent,
      isCompleted: false
    }

    this._todos.push(newTodo)
    this.update()
  }

  deleteTodoById(id: string) {
    this._todos = this._todos.filter(todo => todo.id !== id)
    this.update()
  }

  toggleCompletedById(id: string) {
    const index = this._todos.findIndex(todo => todo.id === id)
    this._todos[index].isCompleted = !this._todos[index].isCompleted
    this.update()
  }
}
