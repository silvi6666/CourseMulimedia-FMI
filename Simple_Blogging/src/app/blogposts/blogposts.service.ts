import {map, catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BlogPost from './blogpost.model';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const API_URL = `/api`;

export interface BlogPostsResponse {
  data: BlogPost[];
}

export interface BlogPostResponse {
  data: BlogPost;
}

@Injectable()
export class BlogPostsService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<BlogPost[]> {
    const blogpostsUrl = `${API_URL}/blogposts`;
    return this.http.get<BlogPostsResponse>(blogpostsUrl).pipe(
      map(resp => resp.data),
      catchError(this.handleError)
    );
  }

  find(id: string): Observable<BlogPost> {
    const blogpostUrl = `${API_URL}/blogposts/${id}`;
    return this.http.get<BlogPostsResponse>(blogpostUrl).pipe(
      map(resp => resp.data),
      catchError(this.handleError)
    );
  }

  create(blogpost: BlogPost): Observable<BlogPost> {
    const blogpostsUrl = `${API_URL}/blogposts`;
    return this.http.post<BlogPostResponse>(blogpostsUrl, blogpost).pipe(
      map(resp => resp.data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend unsuccessful status code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)},
        message was: ${JSON.stringify(error.message)}`);
    }
    // return ErrorObservable with a user-facing error message
    return new ErrorObservable('Error performing the operation. Correct data and try again.');
  }

}
