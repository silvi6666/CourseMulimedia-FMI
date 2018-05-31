import { TestBed, inject } from '@angular/core/testing';
import { BlogPostsService } from './blogposts.service';

describe('BlogPostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogPostsService]
    });
  });

  it('should be created', inject([BlogPostsService], (service: BlogPostsService) => {
    expect(service).toBeTruthy();
  }));
});
