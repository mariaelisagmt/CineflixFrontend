import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/estrutura/home/home.component';
import { MenuComponent } from './components/estrutura/menu/menu.component';
import { RodapeComponent } from './components/estrutura/rodape/rodape.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomeComponent, MenuComponent, RodapeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Lista de Tarefas';
}
