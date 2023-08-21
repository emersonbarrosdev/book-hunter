import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iBook } from '../../models/iBook';

const body = document.querySelector("body");

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent {

  @Input() book: iBook;
  statusModal: boolean = true;
  @Output() changeModal = new EventEmitter();

  constructor() { }

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
