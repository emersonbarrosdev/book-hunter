import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { BookService } from '../../service/book.service';
import { BookSearchComponent } from './book-search.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { iBooksResult } from '../../models/iBooks-result';

class MockBookService {
  getSearch(query: string): Observable<iBooksResult> {
    return of<iBooksResult>({
      totalItems: 1,
      items: [
        {
          volumeInformation: {
            title: 'string',
            authors: ['string'],
            publisher: 'string',
            publishedDate: (new Date('2022-01-01')),
            description: 'string',
            pageCount: 1,
            printType: 'string',
            mainCategory: 'string',
            categories: ['string'],
            averageRating: 1,
            ratingsCount: 1,
            contentVersion: 'string',

            imageLinks: {
              thumbnail: 'https://mock.com/thumbnail.jpg',
              smallThumbnail: 'string',
              small: 'string',
              medium: 'string',
              large: 'string',
              extraLarge: 'string',
            },
            language: 'string',
            infoLink: 'string',
            canonicalVolumeLink: 'string'
          }
        }
      ]
    });
  }
}



describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let bookService: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookSearchComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: BookService, useClass: MockBookService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    fixture.detectChanges();
  });

  it('should initialize search correctly', () => {
    component.searchField.setValue('Angular');

    const result = component.initializeSearch();

    let receivedResult: any;
    result.subscribe((data) => {
      receivedResult = data;
    });

    expect(component.isSearching).toBe(true);
    expect(component.showImage).toBe(false);
    component.searchField.setValue('Angular 2');
    fixture.detectChanges();

    expect(component.isSearching).toBe(true);
    expect(component.showImage).toBe(false);
  });
});
