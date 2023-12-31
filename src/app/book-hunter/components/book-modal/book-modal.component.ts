import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book';

const body = document.querySelector("body");

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent {

  @Input() book: Book;
  statusModal: boolean = true;
  @Output() changeModal = new EventEmitter();

  closeModal() {
    this.statusModal = false;
    this.changeModal.emit(this.statusModal)
    if (body) {
      body.style.overflow = "scroll";
    }
  }

  hideScroll() {
    if (body && this.statusModal == true) {
      body.style.overflow = "hidden";
    }
  }

  readPreview() {
    window.open(this.book.previewLink, '_blank');
  }
}
