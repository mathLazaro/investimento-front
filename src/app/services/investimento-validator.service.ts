import Investimento from '../models/investimento.model';

export function hasNoEmptyFields(investimento: Investimento): boolean {
    return (
        investimento.data !== undefined &&
        investimento.nome !== undefined &&
        investimento.tipo !== undefined &&
        investimento.valor !== undefined
    );
}
