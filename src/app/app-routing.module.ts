import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSearchComponent } from './book-hunter/components/book-search/book-search.component';
import { BookCardComponent } from './book-hunter/components/book-card/book-card.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'book-search',
    pathMatch: 'full'
  },
  {
    path: 'book-search',
    component: BookSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
