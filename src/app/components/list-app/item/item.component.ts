import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import Investimento from '../../../models/investimento.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'item-app',
    imports: [FormsModule],
    templateUrl: './item.component.html',
    styleUrls: ['../list-app.component.css', './item.component.css']
})
export class ItemComponent {
    @Input({ required: true }) investimento!: Investimento;
    @Input({required: true}) alreadyUpdating!: boolean;         // default false

    @Output() startUpdate = new EventEmitter();
    @Output() cancelUpdate = new EventEmitter();
    @Output() handleUpdate = new EventEmitter<Investimento>();
    @Output() delete = new EventEmitter<number>();

    isUpdating = signal(false);
    investimentoToUpdate!: Investimento;

    onSubmitUpdate() {
        this.handleUpdate.emit(this.investimentoToUpdate);
        this.isUpdating.set(false);
    }

    onCancelUpdate() {
        this.isUpdating.set(false);
        this.cancelUpdate.emit();
    }

    onStartUpdate() {
        if(!this.alreadyUpdating) {
            this.isUpdating.set(true);
            this.investimentoToUpdate = {...this.investimento}
            this.startUpdate.emit();
        }
    }

    onDelete() {
        if(!this.alreadyUpdating)
            this.delete.emit(this.investimento.id);
    }
}
