import { Component, signal } from '@angular/core';
import { ItemComponent } from './item/item.component';
import Investimento from '../../models/investimento.model';

const LISTA_INVESTIMENTO: Investimento[] = [
    {
        id: 1,
        nome: 'Investimento Tigre',
        tipo: 'ACAO',
        valor: 5000,
        data: '2025-02-17',
    },
    {
        id: 2,
        nome: 'Forutune Tiger',
        tipo: 'ACAO',
        valor: 5000,
        data: '2025-02-17',
    },
    {
        id: 3,
        nome: 'Dogs',
        tipo: 'ACAO',
        valor: 5000,
        data: '2025-02-17',
    },
];

@Component({
    selector: 'list-app',
    imports: [ItemComponent],
    templateUrl: './list-app.component.html',
    styleUrl: './list-app.component.css',
})
export class ListAppComponent {
    listaInvestimento: Investimento[] = LISTA_INVESTIMENTO;
    isUpdating = signal(false);

    handleUpdate(update: Investimento) {

        console.log(update.nome);
        // TODO - logica atualizar
        const investimento  = this.listaInvestimento.find(i => i.id === update.id);
        investimento!.nome = update.nome;
        investimento!.tipo = update.tipo;
        investimento!.data = update.data;
        investimento!.valor = update.valor;
        console.log(investimento!.nome);


        this.isUpdating.set(false);
    }

    handleDelete(id:number) {
        // TODO - logica delete
        console.log(id);
    }

    startUpdate() {
        this.isUpdating.set(true);
    }

    cancelUpdateEvent() {
        this.isUpdating.set(false);
    }
}
