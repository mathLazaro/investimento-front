import { ErrorDetail } from "./error-detail.model";

export interface ErrorResponse {
    errors: ErrorDetail[],
    message: string,
    status: number,
}
