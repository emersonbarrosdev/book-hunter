export class iBookVolumeInformation {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: Date;
  description?: string;
  previewLink?: string;
  thumbnail?: string;

  constructor(element) {
    this.title = element.volumeInfo?.title;
    this.authors = element.volumeInfo?.authors;
    this.publisher = element.volumeInfo?.publisher;
    this.publishedDate = element.volumeInfo?.publishedDate;
    this.description = element.volumeInfo?.description;
    this.previewLink = element.volumeInfo?.previewLink;
    this.thumbnail = element.volumeInfo?.imageLinks?.thumbnail;
  }
}
