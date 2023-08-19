import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BooksResult } from '../models/books-result';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly GOOGLEAPI = 'https://www.googleapis.com/books/v1/volumes';

  private readonly simulate401Error = 'https://httpbin.org/status/401';
  private readonly simulate404Error = 'https://jsonplaceholder.typicode.com/status/404';
  private readonly simulate503Error = 'https://www.googleapis.com/books/v1/volumes/posts';

  constructor(private http: HttpClient) { }

  getSearch(query: string): Observable<BooksResult> {
    const params = new HttpParams().append('q', query);
    return this.http.get<BooksResult>(`${this.GOOGLEAPI}`, { params }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Ocorreu um erro inesperado. Recarregue a página.';
    switch (error.status) {
      case 401:
        message = 'Não autorizado. Verifique suas credenciais.';
        break;
      case 404:
        message = 'Página não encontrada. Recarregue a página.';
        break;
      case 503:
        message = 'Serviço indisponível no momento. Tente novamente mais tarde.';
        break;
      default:
        message;
    }
    return throwError(new Error(message));
  }
}
