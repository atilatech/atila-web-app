import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {Scholarship} from '../_models/scholarship';
import {environment} from '../../environments/environment';

@Injectable()
export class ScholarshipService {

  form_data: any;

  public scholarshipsPreviewUrl = environment.apiUrl + 'scholarship-preview/';
  public scholarshipSlugUrl = environment.apiUrl + 'scholarship-slug/';
  constructor(public http: HttpClient) {
  }

  preventSortByDoubleCount= false;
  setScholarshipPreviewForm(user_data: any): Promise<any> { //made a promise so we can wait til function
    // is called before navigating url
    this.form_data = user_data;

    return Promise.resolve(this.form_data);
  }

  public extractData(res: HttpResponse<any>) {


    return res || { };

  }

  public handleError (error: HttpResponse<any> | any) {
    // In a real world app, you might use a remote logging infrastructure
    return Observable.throw(error);
  }

  getScholarshipPreviewForm(): Promise<any>{

    return Promise.resolve(this.form_data);
  }

  getPaginatedscholarships(form_data, page): Observable<Scholarship[]> {
    return this.http.get(`https://api.myjson.com/bins/dx1dc`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBySlug(slug: string) {
    return this.http.get(`${this.scholarshipSlugUrl}?slug=${slug}/`)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
