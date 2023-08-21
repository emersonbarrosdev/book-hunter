import { iImageLinks } from './iImage-links';

export interface iVolumeInformation {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  description: string;
  pageCount: number;
  printType: string;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  contentVersion: string;
  imageLinks: iImageLinks;
  language: string;
  infoLink: string;
  canonicalVolumeLink: string;
}
