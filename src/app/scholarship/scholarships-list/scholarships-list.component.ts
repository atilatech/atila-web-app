import {Component, OnInit, ViewChild} from '@angular/core';
import {ScholarshipService} from '../../_services/scholarship.service';

import {Scholarship} from '../../_models/scholarship';

import {ActivatedRoute, Router,} from '@angular/router';
import {prettifyKeys, toTitleCase} from '../../_shared/utils';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';

import {EDUCATION_FIELDS, EDUCATION_LEVEL} from '../../_models/constants';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-scholarships-list',
  templateUrl: './scholarships-list.component.html',
  styleUrls: ['./scholarships-list.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class ScholarshipsListComponent implements OnInit {

  form_data: any;
  isLoggedIn: boolean;
  contentFetched: boolean = false;
  isLoading = true;

  scholarships: Scholarship[]; //TODO: If i use scholarship[] I can't access property members, why?
  scholarship_count: number = 0;
  total_funding: any = 0;
  show_scholarship_funding: boolean = false;
  environment = environment;

  subscriber: any = {};

  locationData = {
    'city': '',
    'province': '',
    'country': '',
  };
  EDUCATION_LEVEL = EDUCATION_LEVEL;

  EDUCATION_FIELD = EDUCATION_FIELDS;
  viewAsUser: any;

  @ViewChild('trySearch') public popover: NgbPopover;

  constructor(public scholarshipService: ScholarshipService,
              public activatedRoute: ActivatedRoute,
              public router: Router,
              public location: Location,) {
  }


  ngOnInit() {

    this.isLoggedIn = false;

    // setTimeout(() => {
    //
    //   this.toggleSearchModal();
    //
    // }, 1000);

    this.scholarshipService.getScholarshipPreviewForm()
      .then(
        res => {
          this.form_data = res;
          if (this.form_data) {
            this.form_data['filter_by_user_show_eligible_only'] = true;
          }
        },
      )
      .then(
        res => this.getScholarshipPreview(),
      )

  }

  getScholarshipPreview(page: number = 1, options: any = {}) {

    if (options['view_as_user']) {
      this.form_data.view_as_user = options['view_as_user'] == '' ? null : options['view_as_user'];
    }
    if (this.form_data) {

      if (this.form_data.filter_by_user) {
        this.form_data.filter_by_user_data = [{
          filter_type: this.form_data.filter_by_user,
          filter_value: [this.transformFilterDisplay(this.form_data.filter_by_user)]
        }]
      }

      if (this.isLoggedIn) {
        const url = this
          .router
          .createUrlTree([{page: page}], {relativeTo: this.activatedRoute})
          .toString();

        this.location.go(url);
      }

      else {
        page = 1;
      }


      if (!this.form_data['sort_by']) {
        this.form_data['sort_by'] = this.isLoggedIn ? 'relevance_new' : 'relevance';
      }
      if (options['view_as_user']) {
      }

      this.scholarshipService.getPaginatedscholarships(this.form_data, page)
        .subscribe(
          res => {

            if (options['change_sort_by']) {
              this.scholarshipService.preventSortByDoubleCount = true;
            }
            this.contentFetched = true;
            this.isLoading = false;


          },
          error => {

            this.contentFetched = false;
            this.isLoading = false;
          },
          () => {
          },
        );
    }
  }

  /* removed in open mode
  saveScholarships(res: any){

  }
  */


  prettifyKeys(str) {
    if (str == 'only_automated') {
      return 'Is Automated';
    }
    if (str == 'relevance_new') {
      return 'Relevance + New';
    }

    return toTitleCase(prettifyKeys(str));
  }

  toggleSearchModal(data?: any) {

    if (this) {
      return;
    }
    if (data && data['toggle']) {
      const isOpen = this.popover.isOpen();
      if (isOpen) {
        this.popover.close()
      }
      else {
        this.popover.open()
      }
      return;
    }

    const isOpen = this.popover.isOpen();
    if (isOpen) {
      this.popover.close()
    }
    else {
      this.popover.open()
    }
  }

  typeaheadEvent(event) {
  }

  /**
   * Adding Google Places API Autocomplete for User Location:
   * @param {google.maps.places.PlaceResult} placeResult
   * https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
   * https://developers.google.com/maps/documentation/javascript/places-autocomplete#address_forms
   * https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
   * https://stackoverflow.com/questions/42341930/google-places-autocomplete-angular2
   */
  placeAutoComplete(placeResult: any, autoCompleteOptions?: any) { //Assign types to the parameters place result is a PlaceResult Type, see documentation
    this.predictLocation(placeResult, autoCompleteOptions);

  }

  /**
   * Translate the PlaceResult object into an Atila location object, containing only the city, province/state and country.
   * @param location
   * @param placeResult
   * @param options
   */
  predictLocation(placeResult, options = {}) {

    options['object_key'] = options['object_key'] || 'locationData';

    var addressComponents = placeResult.address_components;

    var keys = ['city', 'province', 'country'];

    //TODO: Find a more elegant solution for this.


    addressComponents.forEach((element, i, arr) => {
      if (element.types[0] == 'locality' || element.types[0] == 'administrative_area_level_3' || element.types[0] == 'postal_town' || element.types[0] == 'sublocality_level_1') {
        this[options['object_key']].city = element.long_name;
      }

      if (element.types[0] == 'administrative_area_level_1') {
        this[options['object_key']].province = element.long_name;
      }

      if (element.types[0] == 'country') {
        this[options['object_key']][element.types[0]] = element.long_name;
      }
    });

  }

  /**
   * If user presses enter on location button, don't allow the form to submit because we still need to pull the location Data from Google Maps.
   */
  keyDownHandler(event: Event) {

    if ((<KeyboardEvent>event).keyCode == 13) {

      event.preventDefault();
    }
    //TODO! Change this, allow user to submit with enterButton.
  }

  transformFilterDisplay(filter_type) {

    if (['city', 'province', 'country'].indexOf(filter_type) > -1) {
      if (!this.form_data.location[filter_type]) {
        switch (filter_type) {
          case 'city':
            return 'Toronto';

          case 'province':
            return 'Ontario';

          case 'country':
            return 'Canada';
        }
      }
      return this.form_data.location[filter_type];
    }
    if (filter_type == 'post_secondary_school') {
      return 'University of Western Ontario';
    }
    if (filter_type == 'major') {
      return 'Engineering';
    }

  }

}
