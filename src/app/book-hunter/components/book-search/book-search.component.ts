import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { BookService } from '../../service/book.service';
import { BookVolumeInformation } from '../../models/book-volume-information';
import { BooksResult } from '../../models/books-result';
import { Item } from '../../models/item';
import { Router } from '@angular/router';

const PAUSE = 500;

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {

  searchField = new FormControl();
  booksResults: BooksResult;
  errorMessage: string;
  isSearching = false;
  showImage = true;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  initializeSearch(): Observable<BooksResult> {
    this.setupSearch();
    return this.searchField.valueChanges.pipe(
      debounceTime(PAUSE),
      filter(inputElement => inputElement.length >= 3),
      switchMap(inputValue => this.performSearch(inputValue)),
    );
  }

  private setupSearch(): void {
    this.searchField.valueChanges.pipe(
      tap(() => this.isSearching = true),
      tap(() => this.showImage = false),
      catchError(error => {
        this.errorMessage = error.message;
        this.isSearching = false;
        this.showImage = false;
        return [];
      })
    ).subscribe();
  }

  private performSearch(inputValue: string): Observable<BooksResult> {
    return this.bookService.getSearch(inputValue).pipe(
      tap(() => this.isSearching = false),
      catchError(error => {
        this.errorMessage = error.message;
        this.isSearching = false;
        this.showImage = false;
        return [];
      })
    );
  }

  getBooks(items: Item[]): BookVolumeInformation[] {
    return items.map(element => new BookVolumeInformation(element));
  }

  bookFound = this.initializeSearch().pipe(
    map(result => {
      this.booksResults = result;
      return result.items || [];
    }),
    map(items => this.getBooks(items))
  );
}
