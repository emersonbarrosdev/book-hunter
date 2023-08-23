import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BookCardComponent } from './book-card.component';
import { FirstAuthorPipe } from '../../pipes/first-author.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(waitForAsync(()  => {
    TestBed.configureTestingModule({
      declarations: [
        BookCardComponent,
        FirstAuthorPipe
      ], imports: [],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
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


  it('should set openModal to true when the event is true', () => {
    component.onModal(true);
    expect(component.openModal).toBe(true);

  });

  it('should set openModal to false when the event is false ', () => {
    component.onModal(false);
    expect(component.openModal).toBe(false);
  });
});
