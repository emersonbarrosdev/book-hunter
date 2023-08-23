import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstAuthor'
})
export class FirstAuthorPipe implements PipeTransform {

  transform(firstAuthor: string[] | undefined): string {
    if (firstAuthor && firstAuthor.length > 0) {
      return firstAuthor[0];
    }
    return '';
  }

}
