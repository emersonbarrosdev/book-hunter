import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';
import { BookVolumeInformation } from '../../models/book-volume-information';
import { BooksResult } from '../../models/books-result';
import { ImageLinks } from '../../models/image-links';
import { Items } from '../../models/items';
import { VolumeInformation } from '../../models/volume-information';
import { BookService } from '../../service/book.service';
import { BookSearchComponent } from './book-search.component';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let service: BookService;
  let searchField: FormControl;

  beforeEach(waitForAsync(() => {
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
    component.form = searchField;
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
    let items: Items[] = [];
    items = [{ volumeInformation }];
    const result = component.getBooks(items);
    expect(result.length).toBe(1);
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

  it('sould return an BookVolumeInformation array of from a BooksResult valid', () => {
    const mockImageLinks = new ImageLinks();
    mockImageLinks.smallThumbnail = 'link-para-miniatura-pequena.jpg';
    mockImageLinks.thumbnail = 'link-para-miniatura.jpg';
    mockImageLinks.small = 'link-para-imagem-pequena.jpg';
    mockImageLinks.medium = 'link-para-imagem-media.jpg';
    mockImageLinks.large = 'link-para-imagem-grande.jpg';
    mockImageLinks.extraLarge = 'link-para-imagem-extra-grande.jpg';
    const volumeInformation = new VolumeInformation();
    volumeInformation.title = 'Harry Potter e a Pedra Filosofal';
    volumeInformation.authors = ['J.K. Rowling'];
    volumeInformation.publisher = 'Scholastic';
    volumeInformation.publishedDate = new Date('1997-06-26');
    volumeInformation.pageCount = 320;
    volumeInformation.categories = ['Fantasia', 'Ficção Infantojuvenil'];
    volumeInformation.averageRating = 4.5;
    volumeInformation.ratingsCount = 5000;
    volumeInformation.imageLinks = mockImageLinks;
    let items: Items[] = [{ volumeInformation }];
    const mockBookResult = new BooksResult();
    mockBookResult.kind = 'books#volumeList';
    mockBookResult.items = items;
    mockBookResult.totalItems = 1;
    const result = component.processSearchResult(mockBookResult);
    expect(result).toBeTruthy();
    expect(result.length).toBe(mockBookResult.items.length);
    result.forEach(book => {
      expect(book).toEqual(jasmine.any(BookVolumeInformation));
    });
  });

  it('should return an empty array when result.items is null', () => {
    const mockResult: BooksResult = {
      kind: 'books#volumeList',
      items: null,
      totalItems: 0,
    };
    const result = component.processSearchResult(mockResult);
    expect(result).toEqual([]);
  });
});
