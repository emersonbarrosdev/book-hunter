import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from '../../service/book.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule,
        RouterTestingModule.withRoutes([]),],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
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

  it('should toggle isMenuOpen when toggleMenu is called', () => {
    component.isMenuOpen = false;
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true);
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(false);
  });

  it('should toggle isMenuOpen when called', () => {
    component.isMenuOpen = true;
    const btnClick = new Event('click');
    component.onClick(btnClick);
    expect(component.isMenuOpen).toBe(false);
  });

  it('should navigate to the root path when reloadPage is called', () => {
    spyOn(component['router'], 'navigate');
    component.reloadPage()
    expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
  });
});
