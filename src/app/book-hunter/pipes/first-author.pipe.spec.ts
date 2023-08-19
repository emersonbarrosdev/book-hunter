import { FirstAuthorPipe } from './first-author.pipe';

describe('FirstAuthorPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstAuthorPipe();
    expect(pipe).toBeTruthy();
  });
});
