import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Book } from '../../models/book';
import { BookService } from '../../service/book.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnDestroy {

  inputValue = new FormControl('', [Validators.required, Validators.minLength(3)])
  errorMessage: string;
  isSearching = false;
  bookFound: Book[];
  bookSubscription: Subscription;
  totalBooksWithThumbnail: number;
  msg: {};

  constructor(
    private bookService: BookService,
    private searchTranslate: TranslateService
  ) {
    this.getTranslate();
  }

  initializeSearch() {
    this.bookSubscription = this.bookService.getSearch(this.inputValue.value).subscribe({
      next: (resp) => {
        this.isSearching = true;
        if (resp) {
          this.isSearching = false;
          this.totalBooksWithThumbnail = this.calculateTotalBooksWithThumbnails(resp);
          this.bookFound = this.bookInformation(resp.items);
        }
      },
      error: err => this.handleSearchError(err),
    });
  }

  bookInformation(items): Book[] {
    const book: Book[] = [];
    items.forEach(element => {
      if (element.volumeInfo?.imageLinks?.thumbnail) {
        book.push({
          title: element.volumeInfo?.title,
          authors: element.volumeInfo?.authors,
          publisher: element.volumeInfo?.publisher,
          publishedDate: element.volumeInfo?.publishedDate,
          description: element.volumeInfo?.description,
          previewLink: element.volumeInfo?.previewLink,
          thumbnail: element.volumeInfo?.imageLinks?.thumbnail,
        })
      }
    });
    return book;
  }

  calculateTotalBooksWithThumbnails(resp): number {
    return resp.items.filter((element) => element.volumeInfo?.imageLinks?.thumbnail).length;
  }

  getErrorMessage() {
    const field = this.inputValue;
    if (field?.hasError('required')) {
      return this.msg['search.error-message-fill-field'];
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 3;
      return this.msg['search.min-length-error'] + ' ' + requiredLength + ' ' + this.msg['search.characters'];
    }
    return this.msg['search.invalid-field'];
  }

  handleSearchError(error: any) {
    this.errorMessage = error.message;
    this.isSearching = false;
    return [];
  }

  btnSearch() {
    this.initializeSearch()
  }

  getTranslate() {
    this.bookSubscription = this.searchTranslate.get([
      'search.error-message-fill-field',
      'search.min-length-error',
      'search.characters',
      'search.invalid-field',
    ]).subscribe((resp: string) => {
      this.msg = resp;
    });
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

}
