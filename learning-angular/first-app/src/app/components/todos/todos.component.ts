import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo'
import { TodoService } from '../../service/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit()
  {
    // Get request to JSON data over Http
    // Get is async so we subscribe and once async is fulfilled we get our todos to then operate upon
    this.todoService.getTodos().subscribe(todos => 
      {
        this.todos = todos;
      });
  }

  // Operate on caught deleteTodo event:
  /*
  Todo component onDelete().emit() -> todo.component.html catches and calls this 
  */
  deleteTodo(todo:Todo)
  {
    // UI
    this.todos = this.todos.filter(x => x.id != todo.id)
    // On server (server call)
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo)
  {
    // Once we get back our todo from todoService we want to push it to our local todos array
    this.todoService.addTodo(todo).subscribe(todo =>
      {
        this.todos.push(todo);
      });
  }
}
