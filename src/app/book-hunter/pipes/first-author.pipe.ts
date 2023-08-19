import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstAuthor'
})
export class FirstAuthorPipe implements PipeTransform {

  transform(firstAuthor: string[]): string {
    if (firstAuthor) {
      return firstAuthor[0];
    }
    return '';
  }

}
