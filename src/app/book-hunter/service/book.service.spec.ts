import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BookService } from './book.service';
import { first, throwError } from 'rxjs';

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpTestingController.verify();
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request', () => {
    const userQuery = 'angular';
    service.getSearch(userQuery).subscribe((response) => {
      expect(response).toBeTrue();
    });
    const req = httpTestingController.expectOne(`${service['GOOGLEAPI']}${userQuery}+&maxResults=40`);
    expect(req.request.method).toBe('GET');
    const mockResponse = true;
    req.flush(mockResponse);
  });

  it('should handle a 401 error', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 401,
    });

    service['handleError'](errorResponse).subscribe({
      error: (error) => {
        expect(error.message).toBe('Não autorizado. Verifique suas credenciais.');
        done();
      },
    });
  });

  it('should handle a 401 error', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
    });

    service['handleError'](errorResponse).subscribe({
      error: (error) => {
        expect(error.message).toBe('Página não encontrada. Recarregue a página.');
        done();
      },
    });
  });

  it('should handle a 503 error', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 503,
    });

    service['handleError'](errorResponse).subscribe({
      error: (error) => {
        expect(error.message).toBe('Serviço indisponível no momento. Tente novamente mais tarde.');
        done();
      },
    });
  });

  it('should handle a 503 error', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
    });

    service['handleError'](errorResponse).subscribe({
      error: (error) => {
        expect(error.message).toBe('Ocorreu um erro inesperado. Recarregue a página.');
        done();
      },
    });
  });

  it('should handle error using catchError', () => {
    const userQuery = 'Angular';
    const expectedError = new HttpErrorResponse({
      error: 'Ocorreu um erro inesperado. Recarregue a página.',
      status: 500,
      statusText: 'Internal Server Error',
    });
    spyOn(service['http'], 'get').and.returnValue(throwError(expectedError));
    service.getSearch(userQuery).subscribe(
      () => fail('Expected an error, but got a result'),
      (error: HttpErrorResponse) => {
        expect(error.message).toEqual(expectedError.error);
      }
    );
    expect(service['http'].get).toHaveBeenCalled();
    httpTestingController.verify();
  });
});
