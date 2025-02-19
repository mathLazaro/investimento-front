import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Investimento from '../models/investimento.model';
import { ErrorResponse } from '../models/error-response.model';

@Injectable({
    providedIn: 'root',
})
export class InvestimentoService {
    private URL: string = 'investimentos';

    constructor(private http: HttpClient) {}

    getList({page = 0, size = 9} : {page?:number, size?:number}): Observable<any> {
        return this.http.get<any>(`${this.URL}?page=${page}&size=${size}`).pipe(this.handleError());
    }

    get(id: number): Observable<any> {
        return this.http.get<any>(`${this.URL}/${id}`).pipe(this.handleError());
    }

    post(body: any): Observable<any> {
        return this.http.post<any>(`${this.URL}`, body).pipe(this.handleError());
    }

    put(id: number, body: any): Observable<any> {
        console.log(`${this.URL}/${id}`);
        return this.http.put<any>(`${this.URL}/${id}`, body).pipe(this.handleError());
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.URL}/${id}`).pipe(this.handleError());
    }

    private handleError() {
        return catchError((e) => {
            let detailedError = { ...e.error } as ErrorResponse;
            return throwError(() => detailedError);
        });
    }
}
