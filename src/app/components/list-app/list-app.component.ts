import { Component, OnInit, signal } from '@angular/core';
import { ItemComponent } from './item/item.component';
import Investimento from '../../models/investimento.model';
import { InvestimentoService } from '../../services/investimento.service';
import { Page } from '../../models/page.model';
import { ErrorResponse } from '../../models/error-response.model';
import { hasNoEmptyFields } from '../../services/investimento-validator.service';

@Component({
    selector: 'list-app',
    imports: [ItemComponent],
    templateUrl: './list-app.component.html',
    styleUrl: './list-app.component.css',
})
export class ListAppComponent implements OnInit {
    isUpdating = signal(false);
    pageNumber = 0;
    listaInvestimento?: Investimento[];
    page?: Page<Investimento>;

    constructor(private investimentoService: InvestimentoService) {}

    ngOnInit() {
        this.refreshData();
    }

    handleUpdate(update: Investimento) {
        if (hasNoEmptyFields(update)) {
            this.investimentoService.put(update.id, update).subscribe({
                complete: () => {
                    this.refreshData();
                },
                error: (error: ErrorResponse) => {

                }
            });
            this.isUpdating.set(false);
        } else {
            // TODO - tratar logica de campos vazios
        }
    }

    handleDelete(id: number) {
        this.investimentoService.delete(id).subscribe({
            complete: () => {
                this.refreshData();
            },
        });
    }

    startUpdate() {
        this.isUpdating.set(true);
    }

    cancelUpdateEvent() {
        this.isUpdating.set(false);
    }

    // TODO - corrigir quando se elimina todos os elementos da lista - diminuir automaticamente uma pagina
    onPreviousPage() {
        this.pageNumber--;
        this.refreshData();
    }

    onNextPage() {
        this.pageNumber++;
        this.refreshData();
    }

    private refreshData() {
        this.investimentoService.getList({page: this.pageNumber}).subscribe((res) => {
            this.page = {
                totalPages: res.totalPages,
                totalElements: res.totalElements,
                content: res.content,
            } as Page<Investimento>;
            this.listaInvestimento = this.page.content;
            if (this.listaInvestimento.length === 0 && this.pageNumber > 0) {
                this.pageNumber--;
                this.refreshData();
            }
        });
    }


}
