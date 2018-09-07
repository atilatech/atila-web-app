import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';


@Injectable()
export class SearchService {

  public searchUrl = environment.apiUrl + 'search/';
  constructor(
    public http: HttpClient,
  ) { }

  relatedItems(queryString, metaData?) {
    return this.http.get(this.searchUrl + 'related-items/'+queryString)
      .map(res=>res)
      .catch(err=>Observable.throw(err))
  }


}
