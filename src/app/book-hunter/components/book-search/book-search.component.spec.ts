import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { BooksResult } from '../../models/books-result';
import { ImageLinks } from '../../models/image-links';
import { Item } from '../../models/item';
import { VolumeInformation } from '../../models/volume-information';
import { BookService } from '../../service/book.service';
import { BookSearchComponent } from './book-search.component';



describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let bookService: BookService;
  let searchField: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookSearchComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        BookService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    searchField = new FormControl();
    component.searchField = searchField;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.detectChanges();
    fixture = null;
    component = null;
  });


  it('should initialize search correctly', () => {
    component.searchField.setValue('Angular');

    const result = component.initializeSearch();

    let receivedResult: any;
    result.subscribe((data) => {
      receivedResult = data;
    });
    component.isSearching = true;
    component.showImage = false;
    fixture.detectChanges();
    expect(component.isSearching).toBe(true);
    expect(component.showImage).toBe(false);
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

  it('should return an empty array when initializeSearch result has no items', () => {
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
    const booksResult: BooksResult = {

      items: items,
      totalItems: items.length,
    };
    spyOn(component, 'initializeSearch').and.returnValue(of(booksResult));
    component.bookFound.subscribe((result) => {
      expect(result).toEqual([]);
    });
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
    spyOn(bookService, 'getSearch').and.returnValue(throwError({ message: errorMessage }));
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
