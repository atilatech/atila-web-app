import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ScholarshipService {

  form_data: any;

  constructor(public http: HttpClient) {
  }

  setScholarshipPreviewForm(user_data: any): Promise<any> { //made a promise so we can wait til function
    // is called before navigating url
    this.form_data = user_data;

    return Promise.resolve(this.form_data);
  }

}
