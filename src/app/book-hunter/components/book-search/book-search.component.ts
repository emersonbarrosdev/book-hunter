import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { BookService } from '../../service/book.service';
import { iBookVolumeInformation } from '../../models/iBook-volume-information';
import { iBooksResult } from '../../models/iBooks-result';
import { iItem } from '../../models/iItem';
import { Router } from '@angular/router';

const PAUSE = 1000;

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {

  searchField = new FormControl();
  booksResults: iBooksResult;
  errorMessage: string;
  isSearching = false;
  showImage = true;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  initializeSearch(): Observable<iBooksResult> {
    this.setupSearch();
    return this.searchField.valueChanges.pipe(
      debounceTime(PAUSE),
      filter(inputElement => inputElement.length >= 2),
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

  private performSearch(inputValue: string): Observable<iBooksResult> {
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

  getBooks(items: iItem[]): iBookVolumeInformation[] {
    return items.map(element => new iBookVolumeInformation(element));
  }

  bookFound = this.initializeSearch().pipe(
    map(result => {
      this.booksResults = result;
      return result.items || [];
    }),
    map(items => this.getBooks(items))
  );
}
