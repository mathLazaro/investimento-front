import Investimento from "./investimento.model";

export interface Page<T> {
    content: T[],
    totalPages: number,
    totalElements: number,
}
