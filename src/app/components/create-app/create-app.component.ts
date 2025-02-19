import { Component, effect, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Investimento from '../../models/investimento.model';
import { RouterLink } from '@angular/router';
import { InvestimentoService } from '../../services/investimento.service';
import { ErrorResponse } from '../../models/error-response.model';
import { hasNoEmptyFields } from '../../services/investimento-validator.service';

@Component({
    selector: 'app-create-app',
    imports: [FormsModule, RouterLink],
    templateUrl: './create-app.component.html',
    styleUrl: './create-app.component.css',
})
export class CreateAppComponent {
    feedback?: string;
    violationFields = signal<string[]>([]);

    constructor(private investimentoService: InvestimentoService) {
        effect(() => {
            Array.from(document.getElementsByTagName("input")).forEach((element)=>element.style.borderColor = "");
            this.violationFields().forEach((field:string) => {
                document.getElementById(field)!.style.borderColor = "red";

            });
        });
    }

    investimento = {} as Investimento;

    onSubmit() {
        if (hasNoEmptyFields(this.investimento)) {
            this.investimentoService.post(this.investimento).subscribe({
                next: () => {
                    this.feedback = 'Criado com sucesso';
                    this.investimento = {} as Investimento;
                },
                error: (err: ErrorResponse) => {
                    this.feedback = err.message;
                    if (err.errors) {
                        this.violationFields.set(err.errors.map(ed => ed.field));
                    }
                },
            });
        } else {
            this.feedback = 'Todos os campos devem ser preenchidos';
        }
    }
}
