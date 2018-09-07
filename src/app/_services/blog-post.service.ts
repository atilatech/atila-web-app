import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';
@Injectable()
export class BlogPostService {


  public blogsUrl = environment.apiUrl + 'blog/blog-posts/';

  public blogUrl = environment.apiUrl + 'blog/';

  public blogsSlugUrl = environment.apiUrl + 'blog/blog-slug/';
  constructor(public http: HttpClient) { }

  list(): Observable<any>{
    return this.http.get(`${this.blogsUrl}`)
    .map(res => res)
    .catch(err => Observable.throw(err));
  }

  getBySlug(username:string, slug: string) {
    return this.http.get(`${this.blogUrl}blog/${username}/${slug}/`)
      .map(res => res)
      .catch(err => Observable.throw(err));
  }

  getById(id:number){
    return this.http.get(`${this.blogsUrl}${id}/`)
    .map(res => res)
    .catch(err => Observable.throw(err));
  }

  getComments(id:number){
    return this.http.get(`${this.blogsUrl}${id}/comments/`)
    .map(res => res)
    .catch(err => Observable.throw(err));
  }

  create(data): Observable<any>{
    return this.http.post(`${this.blogsUrl}`,data)
    .map(res => res)
    .catch(err => Observable.throw(err));
  }

  update(id:number, data): Observable<any>{
    return this.http.put(`${this.blogsUrl}${id}/`,data)
    .map(res => res)
    .catch(err => Observable.throw(err));
  }

  patch(data) {
    return this.http.patch(`${this.blogsUrl}${data.id}/`,data)
      .map(res => res)
      .catch(err => Observable.throw(err));
  }
}
