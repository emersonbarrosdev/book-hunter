import { FirstAuthorPipe } from './first-author.pipe';

describe('FirstAuthorPipe', () => {
  let pipe: FirstAuthorPipe;

  beforeEach(() => {
    pipe = new FirstAuthorPipe();
  });

  it('should return the first author', () => {
    const authors = ['Author 1', 'Author 2', 'Author 3'];
    const result = pipe.transform(authors);
    expect(result).toBe('Author 1');
  });

  it('should return an empty string for an empty array', () => {
    const authors: string[] = [];
    const result = pipe.transform(authors);
    expect(result).toBe('');
  });

  it('should return an empty string for an undefined or null array', () => {
    const authors: string[] | null | undefined = undefined;
    const result = pipe.transform(authors);
    expect(result).toBe('');
  });
});
