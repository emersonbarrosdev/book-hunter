import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCardComponent } from './book-hunter/components/book-card/book-card.component';
import { BookModalComponent } from './book-hunter/components/book-modal/book-modal.component';
import { BookSearchComponent } from './book-hunter/components/book-search/book-search.component';
import { HeaderComponent } from './book-hunter/components/header/header.component';
import { FirstAuthorPipe } from './book-hunter/pipes/first-author.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatFormFieldModule} from '@angular/material/form-field';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18N/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookSearchComponent,
    BookCardComponent,
    BookModalComponent,
    FirstAuthorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
    }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
