import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BookService } from './book.service';

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


  it('calls reload function', () => {
    spyOn(service, 'reloadPage').and.callThrough()
    expect(service.reloadPage).toBeTruthy();
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
});
