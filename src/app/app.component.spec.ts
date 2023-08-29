import { ComponentFixture, TestBed, async, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.module';
const TRANSLATIONS_EN = require('../assets/i18n/en.json');
const TRANSLATIONS_FR = require('../assets/i18n/fr.json');

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({

    imports: [RouterTestingModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })],
    declarations: [AppComponent, TranslateService]
  })));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.detectChanges();
    fixture = null;
  });


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should load translations', async(() => {
    spyOn(translate, 'getBrowserLang').and.returnValue('en');
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;

    // the DOM should be empty for now since the translations haven't been rendered yet
    expect(compiled.querySelector('h2').textContent).toEqual('');

    http.expectOne('/assets/i18n/en.json').flush(TRANSLATIONS_EN);
    http.expectNone('/assets/i18n/fr.json');

    // Finally, assert that there are no outstanding requests.
    http.verify();

    fixture.detectChanges();
    // the content should be translated to english now
    expect(compiled.querySelector('h2').textContent).toEqual(TRANSLATIONS_EN.HOME.TITLE);

    translate.use('fr');
    http.expectOne('/assets/i18n/fr.json').flush(TRANSLATIONS_FR);

    // Finally, assert that there are no outstanding requests.
    http.verify();

    // the content has not changed yet
    expect(compiled.querySelector('h2').textContent).toEqual(TRANSLATIONS_EN.HOME.TITLE);

    fixture.detectChanges();
    // the content should be translated to french now
    expect(compiled.querySelector('h2').textContent).toEqual(TRANSLATIONS_FR.HOME.TITLE);
  }));
});
