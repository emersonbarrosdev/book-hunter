import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from '../../service/book.service';
import { HeaderComponent } from './header.component';
import { MatMenuModule } from '@angular/material/menu';
import { eTheme } from '../../enums/eTheme';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatMenuModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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

  it('should navigate to the root path when reloadPage is called', () => {
    spyOn(component['router'], 'navigate');
    component.reloadPage()
    expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
  });

  it('should toggle to dark theme', () => {
    document.body.classList.remove('dark-theme');
    component.toggle();
    expect(document.body.classList.contains('dark-theme')).toBe(true);
    expect(component.applyTheme).toBe(eTheme.TEXT_DARK);
    expect(component.applyIcon).toBe(eTheme.ICON_SUN);
  });

  it('should toggle to light theme', () => {
    document.body.classList.add('dark-theme');
    component.toggle();
    expect(document.body.classList.contains('dark-theme')).toBe(false);
    expect(component.applyTheme).toBe(eTheme.TEXT_LIGHT);
    expect(component.applyIcon).toBe(eTheme.ICON_MOON);
  });
});
