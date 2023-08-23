import { Component, Input } from '@angular/core';
import { iBook } from '../../models/iBook';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  @Input() book: iBook;
  openModal: boolean;

  onModal(event: boolean) {
    this.openModal = event;
  }
}
