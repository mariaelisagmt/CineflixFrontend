import { Component } from '@angular/core';
import { TodoComponent } from "../../todo/todo.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
