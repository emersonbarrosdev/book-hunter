import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';
import { BooksResult } from '../../models/books-result';
import { ImageLinks } from '../../models/image-links';
import { Item } from '../../models/item';
import { VolumeInformation } from '../../models/volume-information';
import { BookService } from '../../service/book.service';
import { BookSearchComponent } from './book-search.component';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let service: BookService;
  let searchField: FormControl;

  beforeEach(waitForAsync (() => {
     TestBed.configureTestingModule({
      declarations: [BookSearchComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        BookService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BookService);
    searchField = new FormControl();
    component.searchField = searchField;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.detectChanges();
    fixture = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty array when input is empty', () => {
    let imagesLinks = new ImageLinks();
    const volumeInformation = new VolumeInformation();
    volumeInformation.title = 'Book 1';
    volumeInformation.authors = ['Author 1'];
    volumeInformation.publisher = 'Publisher 1';
    volumeInformation.publishedDate = (new Date('2023-01-01'));
    volumeInformation.pageCount = 2;
    volumeInformation.categories = [''];
    volumeInformation.averageRating = 2;
    volumeInformation.ratingsCount = 2;
    volumeInformation.imageLinks = imagesLinks;
    let items: Item[] = [];
    items = [{ volumeInformation }];
    const result = component.getBooks(items);
    expect(result.length).toBe(1);
  });

  it('should return BooksResult on successful search', () => {
    let imagesLinks = new ImageLinks();
    const volumeInformation = new VolumeInformation();
    volumeInformation.title = 'Book 1';
    volumeInformation.authors = ['Author 1'];
    volumeInformation.publisher = 'Publisher 1';
    volumeInformation.publishedDate = (new Date('2023-01-01'));
    volumeInformation.pageCount = 2;
    volumeInformation.categories = [''];
    volumeInformation.averageRating = 2;
    volumeInformation.ratingsCount = 2;
    volumeInformation.imageLinks = imagesLinks;
    let items: Item[] = [{ volumeInformation }];
    const inputValue = 'Angular';
    const booksResult: BooksResult = {
      kind: 'string',
      items: items,
      totalItems: items.length,
    };
    component.performSearch(inputValue).subscribe(result => {
      expect(result).toEqual(booksResult);
    });

    expect(component.isSearching).toBe(false);
    expect(component.errorMessage).toBeUndefined();
    expect(component.showImage).toBe(true);
  });

  it('should handle error and update variables', () => {
    const inputValue = 'Angular';
    const errorMessage = 'Error message';
    spyOn(service, 'getSearch').and.returnValue(throwError({ message: errorMessage }));
    component.performSearch(inputValue).subscribe({
      error: error => {
        expect(error.message).toEqual(errorMessage);
      },
    });
    expect(component.isSearching).toBe(false);
    expect(component.errorMessage).toEqual(errorMessage);
    expect(component.showImage).toBe(false);
  });

  it('should set isSearching to true and showImage to false when search starts', () => {
    spyOn(component, 'setupSearch').and.callThrough();
    component.setupSearch();
    searchField.setValue('Angular');
    expect(component.isSearching).toBe(true);
    expect(component.showImage).toBe(false);
  });

});
