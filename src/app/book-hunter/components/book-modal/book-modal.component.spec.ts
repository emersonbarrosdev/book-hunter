import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookModalComponent } from './book-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookModalComponent', () => {
  let component: BookModalComponent;
  let fixture: ComponentFixture<BookModalComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookModalComponent],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(BookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal and emit an event', () => {
    spyOn(component.changeModal, 'emit');
    fixture.detectChanges();
    component.closeModal();
    component.statusModal = false;
    expect(component.statusModal).toBe(false);
    expect(component.changeModal.emit).toHaveBeenCalled();
  });

  it('should open the modal and emit an event', () => {
    spyOn(component.changeModal, 'emit');
    fixture.detectChanges();
    component.closeModal();
    component.statusModal = true;
    expect(component.statusModal).toBe(true);
    expect(component.changeModal.emit).toHaveBeenCalledWith(false);
  });

  it('should open the book preview link in a new window', () => {
    spyOn(window, 'open')
    const book = { previewLink: 'https://www.google.com.br/' };
    component.book = book;
    component.readPreview();
    expect(window.open).toHaveBeenCalledWith(book.previewLink, '_blank');
  });

});
