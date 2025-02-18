import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Investimento from '../../models/investimento.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-app',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-app.component.html',
  styleUrl: './create-app.component.css'
})
export class CreateAppComponent {
    investimento = {nome: "estet", tipo: "tipo", valor: 500, data: "2025-02-17"} as Investimento

}
