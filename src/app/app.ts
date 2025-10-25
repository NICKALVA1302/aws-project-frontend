import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmpleadoComponent, HttpClientModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('frontend');
}
