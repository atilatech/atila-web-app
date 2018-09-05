import {Component, OnInit, OnDestroy, HostListener, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import { ScholarshipService } from "../_services/scholarship.service";

import { Router, ActivatedRoute } from '@angular/router';

import {NgModel} from '@angular/forms';
import { GooglePlaceDirective } from "../_directives/google-place.directive";
import {GoogleAnalyticsEventsService} from '../_services/google-analytics-events.service';
import {MatDialog} from '@angular/material';
import {SubscriberDialogComponent} from '../subscriber-dialog/subscriber-dialog.component';
import {UserProfileService} from '../_services/user-profile.service';
import {MyFirebaseService} from '../_services/myfirebase.service';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../_services/auth.service';
import {prettifyKeys, toTitleCase} from '../_shared/utils';
import {MASTER_LIST_EVERYTHING} from '../_models/constants';
//import {GeocoderAddressComponent} from '@types/googlemaps'

//import 'googlemaps';
export class PreviewResponse {

  public searchString = '';
  public previewMode = 'universalSearch';
  constructor(
  public location = {
  city: '',
  province: '',
  country: '',
  name: '',
  },
  public education_level :string[],
  public education_field :string[],
  public errors :string,
    ) {

  }
}


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit, OnDestroy {


    prettifyKeys = prettifyKeys;
    toTitleCase = toTitleCase;

    EDUCATION_LEVEL = [
    'Secondary School',
    'University',
    'College',
    'Workplace or Apprenticeship',
  ];

    blogs = [
    {
      "id": 9,
      "title": "How I got interviews at Google, Facebook and Bridgewater",
      "slug": "how-i-got-interviews-at-google-facebook-and-bridgewater",
      "alternate_slugs": [
        "got-interviews-google-facebook-bridgewater"
      ],
      "dummy_field_detect_migrations_heroku": null,
      "date_created": "2018-03-27T13:17:20Z",
      "description": "Last summer, I decided that I wanted to work at a top tech company such as Google or Bridgewater. Problem. I didn't go to a target school, my grades were just okay and I had little work experience. If I wanted to get a chance at these companies I would have to get creative.",
      "header_image_url": "https://lh6.googleusercontent.com/U1oHmeuzUcMbPLHFhpDHc_8KsFWq7IX_jE6kUBl1svTSnffIukAjJ0QDgfXJCdZ_rONXiZzhtNnz3CrFMDEnrIrMc5MpnWcSuUfEURbNRFM9lxYPN6qDMSMHPqC02h9o0pO9UlUP",
      "published": true,
      "up_votes_count": 0,
      "down_votes_count": 0,
      "up_votes_id": [],
      "down_votes_id": [],
      "user": {
        "first_name": "Tomiwa",
        "last_name": "Ademidun",
        "username": "tomiwa",
        "profile_pic_url": "https://firebasestorage.googleapis.com/v0/b/atila-7-dev/o/user-profiles%2F4%2Fprofile-pictures%2Fgithub-profile-picture.jpeg?alt=media&token=4d2ba5a2-e4d8-46e3-8323-e63a65b356cb",
        "title": "Software Engineering Student",
        "post_secondary_school": "",
        "secondary-school": "",
        "id": 4
      },
      "contributors": [],
      "metadata": {
        "comments_count":1
      }
    },
    {
        "id": 9,
        "title": "Starting A Dating Company While in University",
        "slug": "starting-a-dating-company-while-in-university",
        "alternate_slugs": [],
        "dummy_field_detect_migrations_heroku": null,
        "date_created": "2018-03-27T00:29:11Z",
        "description": "While my friends were getting ready for graduation and trying to find full time jobs I decided to start a dating company, while overloading a full-time dual degree in computer science and business. Hectic would be an understatement.",
        "header_image_url": "https://lh6.googleusercontent.com/Je3UMTLTs4y_fDcbk9iZIT9sDReM7hagbKHUz5PevY4erS_CKFWSdsws5HII7SuFvloWCAxSyteRmlyEiwRpoz7fa7IAXmyn5SXOIPMJwMra9WdQ1VbbL3WIC7UHKG8ZRYUqdleY",
        "published": true,
        "up_votes_count": 0,
        "down_votes_count": 0,
        "up_votes_id": [],
        "down_votes_id": [],
        "metadata": {
          "comments_count": 0,
        },
        "user": {
          "first_name": "Michael",
          "last_name": "Ding",
          "username": "mding5692",
          "profile_pic_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F17%2Fprofile-pictures%2Fmding-profile-pic.jpg?alt=media&token=11da0398-d23b-4090-9b59-fda1dfbd35cd",
          "title": "",
          "post_secondary_school": "",
          "secondary-school": "",
          "id": 17
        },
        "contributors": []
      },
    {
        "id": 7,
        "title": "How to Get a Research Internship and What I Learned Through Research",
        "slug": "how-to-get-a-research-internship-and-what-i-learned-through-research",
        "alternate_slugs": [],
        "dummy_field_detect_migrations_heroku": null,
        "date_created": "2018-03-25T04:40:37.235094Z",
        "description": "Last Summer I did a research project with the Electrical and Computer Engineering department on smart building energy consumption. This article will explain how I was able to get a research internship despite my limited initial knowledge and some advice on how you can do the same and a few important lessons I learnt.",
        "header_image_url": "https://lh4.googleusercontent.com/KNwXlOrE-ehxIfBBi0Dii71VSOdJ44DNZq9z5inZ5LOGIOeXnwNrnkXlom6BL2I0MiUMp1uK0MYp1Ao1PpyGxOyJhVEHhtXITM6hSQxIf5v5FrJXZfXR6MFz_zl5qiwRDOTRq4XE",
        "published": true,
        "up_votes_count": 0,
        "down_votes_count": 0,
        "up_votes_id": [],
        "down_votes_id": [],
        "metadata": {
          "comments_count": 0,
        },
        "user": {
          "first_name": "Rahim",
          "last_name": "Shamsy",
          "username": "rshamsy",
          "profile_pic_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F116%2Fprofile-pictures%2Frahim-profile-pic.jpg?alt=media&token=f4970d20-c0e2-4728-aa0f-3fea9ba6a656",
          "title": "",
          "post_secondary_school": "",
          "secondary-school": "",
          "id": 116
        },
      "contributors": [],
      },
  ]

    forums = [
      {
        "id": 9,
        "starting_comment": {
          "title": "Deciding between Kinesiology, Health Studies or Medical Science",
          "username": "thinkr",
          "text": "Hi everyone, \r\nI'm a Grade 12 student in the process of deciding on a university program. My current options are Health Studies, Kinesiology, and Medical Science.\r\n\r\n I know that I’m interested in science and the health care field in general, but I don't want to box myself into any specific career at this point in time. I want to explore and do some shadowing before I decide on a professional program (i.e. physical therapy, pharmacy, medicine and dentistry) or other graduate studies.\r\n\r\nI am leaning towards Medical Science, but I'm concerned that if I decide not to do Medicine, I won't have anything to fall back on. That being said, are there any tips or advice anyone has for selecting a program in this beginning stage of my post-secondary pathway?\r\n\r\nI would also appreciate the perspective of individuals currently in these respective fields of study or in their practice. What are three things that you like about the field, and three things you dislike about it?",
          "up_votes_count": 0,
          "down_votes_count": 0,
          "id": 20,
          "up_votes_id": []
        },
        "title": "Deciding between Kinesiology, Health Studies or Medical Science",
        "slug": "deciding-between-kinesiology-health-studies-or-medical-science",
        "date_created": "2018-03-14T12:34:38Z",
        "metadata": {
          "comments_count": 3
        },
        "user": {
          "first_name": "Paula",
          "last_name": "M.",
          "username": "thinkr",
          "profile_pic_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2Fgeneral-data%2Fdefault-profile-pic.png?alt=media&token=455c59f7-3a05-43f1-a79e-89abff1eae57",
          "title": "",
          "post_secondary_school": "",
          "secondary-school": "",
          "id": 101
        }
      },
      {
        "id": 7,
        "starting_comment": {
          "title": "Queen's Chancellor Recipient 2016 and Queen's Commerce AMA",
          "username": "AnnMathulla",
          "text": "Hi everyone, \r\n\r\nMy name is Ann, and I was fortunate enough to win the Queen's Chancellor Scholarship in 2016. Currently I'm in second year in the Queen's Commerce Program, and next year I will be spending one semester at the National University of Singapore, very excited! \r\n\r\nI know university and scholarship applications can be very stressful (trust me, I've been there!), and I hope that sharing some of my experiences will help you as you navigate your way through this stressful yet exciting time! \r\n\r\nIf you have any questions about Queen's Commerce, the Chancellor's Scholarship or anything else feel free to ask! I'm happy to help in any way that I can :)",
          "up_votes_count": 0,
          "down_votes_count": 0,
          "id": 17,
          "up_votes_id": []
        },
        "title": "Queen's Chancellor Recipient 2016 and Queen's Commerce AMA",
        "slug": "queens-chancellor-recipient-2016-and-queens-commerce-ama",
        "date_created": "2018-02-05T01:52:12Z",
        "metadata": {},
        "user": {
          "first_name": "Ann",
          "last_name": "Mathulla",
          "username": "AnnMathulla",
          "profile_pic_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F72%2Fprofile-pictures%2FHead%20Shot.jpg?alt=media&token=65ebd302-8c46-4b7e-b748-e8910c345ce6",
          "title": "",
          "post_secondary_school": "Queen's University",
          "secondary-school": "",
          "id": 72
        }
      },
      {
        "id": 5,
        "starting_comment": {
          "title": "Should I study Computer Science, Software, or Computer Engineering",
          "username": "zoginni",
          "text": "I'm a high school senior looking to study Software engineering, Computer science or Computer engineering. The schools I'm looking at offer SE and CE as a second-year option, which is available after a general first year. My interest lies mostly in software, but I'd also like to learn the hardware side of it computer systems as well. \n\nIf I take CS, on the off chance that I don’t like it, I don’t want to end up in a position where I can only do another math/science major. \n\nWith the general year, however, if I just end up picking software anyways I think I would feel as if I wasted that year when I could have had a year of coding down in CS. With that year of coding, I could be looking at working for a term or I could focus on building my own project portfolio.\n\nSo, in general: If I take general engineering first I may be able to drop into CS, but I would be behind. But if I don’t like CS I can’t go into engineering at all. Which major should I pick if my goal right now is to work in software? ",
          "up_votes_count": 0,
          "down_votes_count": 0,
          "id": 6,
          "up_votes_id": []
        },
        "title": "Should I study Computer Science, Software, or Computer Engineering",
        "slug": "should-i-study-computer-science-software-or-computer-engineering",
        "date_created": "2018-01-19T22:13:43.648669Z",
        "metadata": {
          "comments_count": 6
        },
        "user": {
          "first_name": "Zion",
          "last_name": "Oginni",
          "username": "zoginni",
          "profile_pic_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F39%2Fprofile-pictures%2FIMG_7111.JPG?alt=media&token=e3088001-19a0-4ebf-8172-80df143d8977",
          "title": "High School Senior",
          "post_secondary_school": "Queen's University",
          "secondary-school": "",
          "id": 39
        }
      },
    ];

    essays = [
      {
        "id": 3,
        "title": "Queen's Commerce and Engineering Application 2014",
        "slug": "queens-commerce-and-engineering-application-2014",
        "date_created": "2018-06-13T13:42:09.754931Z",
        "description": "My applications for both the Queen's Commerce and Engineering program. The first part is for both engineering and Commerce programs. The second part was specifically for the Queen's Commerce program.",
        "status": "accepted",
        "status_other": null,
        "header_image_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/blogs%2Fgeneral%2Fblog-default-image.jpg?alt=media&token=b739ac92-4402-4d89-9c83-40ec9e476146",
        "essay_source_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F1%2Fessays%2F3%2FQueens%20PSE%20and%20Commerce%20Application%202014.pdf?alt=media&token=52c7bd24-980a-4df3-854d-45008c4aac30",
        "published": true,
        "up_votes_count": 0,
        "down_votes_count": 0,
        "up_votes_id": [],
        "down_votes_id": [],
        "metadata": {},
        "user": {
          "first_name": "Tomiwa",
          "last_name": "Ademidun",
          "username": "tomiwa",
          "profile_pic_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F1%2Fprofile-pictures%2Ffacebook-profile-picture.jpg?alt=media&token=8754c657-bbdc-4d8e-ae1d-d4047ac09c6d",
          "title": "Software Engineering Student",
          "post_secondary_school": "University of Western Ontario",
          "secondary-school": "",
          "id": 1
        },
        "contributors": []
      },
      {
        "id": 2,
        "title": "Ivey Business School AEO Application 2014",
        "slug": "ivey-business-school-aeo-application-2014",
        "date_created": "2018-06-13T13:33:02.659480Z",
        "description": "My AEO University application for Ivey Business School 2014.\n           I applied to the software engineering and business dual degree program. Ivey places an emphasis on leadership so I really try to highlight how I demonstrate strong leadership in the examples I give in my essay.",
        "status": "accepted",
        "status_other": null,
        "header_image_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/blogs%2Fgeneral%2Fblog-default-image.jpg?alt=media&token=b739ac92-4402-4d89-9c83-40ec9e476146",
        "essay_source_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F1%2Fessays%2F2%2FIvey%20AEO%20Application%202014.pdf?alt=media&token=ee61734a-1667-4b24-8ee1-0ba178247b4b",
        "published": true,
        "up_votes_count": 0,
        "down_votes_count": 0,
        "up_votes_id": [],
        "down_votes_id": [],
        "metadata": {},
        "user": {
          "first_name": "Tomiwa",
          "last_name": "Ademidun",
          "username": "tomiwa",
          "profile_pic_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F1%2Fprofile-pictures%2Ffacebook-profile-picture.jpg?alt=media&token=8754c657-bbdc-4d8e-ae1d-d4047ac09c6d",
          "title": "Software Engineering Student",
          "post_secondary_school": "University of Western Ontario",
          "secondary-school": "",
          "id": 1
        },
        "contributors": []
      },
      {
        "id": 1,
        "title": "Ivey Business School AEO2 Application 2016",
        "slug": "ivey-business-school-aeo2-application-2016",
        "date_created": "2018-06-09T23:09:41.047955Z",
        "description": "My AEO2 University application for Ivey Business School 2016.\nThis is the application I submitted after my 2nd year of university to keep my spot in the HBA1 as part of the AEO program.\n           I applied to the software engineering and business program. \n\nThe admissions person I talked to mentioned they cared a lot about community involvement and leadership which I tried to highlight in the first 2 examples.",
        "status": "accepted",
        "status_other": null,
        "header_image_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/blogs%2Fgeneral%2Fblog-default-image.jpg?alt=media&token=b739ac92-4402-4d89-9c83-40ec9e476146",
        "essay_source_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F1%2Fessays%2F1%2FIvey%20AEO2%20Application.pdf?alt=media&token=a8058c38-6baa-4e64-addf-6c0eb8f56e89",
        "published": true,
        "up_votes_count": 0,
        "down_votes_count": 0,
        "up_votes_id": [],
        "down_votes_id": [],
        "metadata": {},
        "user": {
          "first_name": "Tomiwa",
          "last_name": "Ademidun",
          "username": "tomiwa",
          "profile_pic_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F1%2Fprofile-pictures%2Ffacebook-profile-picture.jpg?alt=media&token=8754c657-bbdc-4d8e-ae1d-d4047ac09c6d",
          "title": "Software Engineering Student",
          "post_secondary_school": "University of Western Ontario",
          "secondary-school": "",
          "id": 1
        },
        "contributors": []
      }
    ];

    EDUCATION_FIELD = [
       'Arts (Undergrad)',
       'STEM (Undergrad)',
       'Trade School',
       'Visual + Performing Arts',
       'Law School',
       'Medical School',
       'MBA',
       'Arts (Grad School)',
       'STEM (Grad School)',
       'Other'
   ];
    MASTER_LIST_EVERYTHING = MASTER_LIST_EVERYTHING.map(item => item.toLowerCase());


    model = new PreviewResponse({
    city: '',
    province: '',
    country: '',
    name: '',
    },[],[],'');

    sampleSearches = [
      'Engineering',
      'Toronto',
      'Female',
      'Medical School',
      'International Student',
    ]

    /**
    * If the Google Places API is not working, only ask for city.
    */
    public locationPlaceHolder = 'City, Province or Country';
    public subscriber: any = {};
    @ViewChild('trySearch') public popover: NgbPopover;
    constructor(
    public scholarshipService: ScholarshipService,
    public firebaseService: MyFirebaseService,
    public router: Router,
    public googleAnalyticsEventService: GoogleAnalyticsEventsService,
    public dialog: MatDialog,
    public authService: AuthService,
    ) {

    }

  ngOnInit() {

    $(function(){
      $('iframe.lazy-load-element').attr('src', '//www.youtube.com/embed/c_K4342WMwQ?cc_load_policy=1');
    });

  }

  ngOnDestroy() {
    document.body.style.backgroundColor = null;
  }
  /**
   * Adding Google Places API Autocomplete for User Location:
   * @param {google.maps.places.PlaceResult} placeResult
   * https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
   * https://developers.google.com/maps/documentation/javascript/places-autocomplete#address_forms
   * https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
   * https://stackoverflow.com/questions/42341930/google-places-autocomplete-angular2
   */
  placeAutoComplete(placeResult:any, locationModel: NgModel){ //Assign types to the parameters place result is a PlaceResult Type, see documentation


    this.predictLocation(this.model.location, placeResult);

  }

  /**
   * Translate the PlaceResult object into an Atila location object, containing only the city, province/state and country.
   * @param location
   * @param placeResult
   */
  predictLocation(location, placeResult){
    var addressComponents = placeResult.address_components ;

    var keys = ['city', 'province', 'country'];

    //TODO: Find a more elegant solution for this.


    addressComponents.forEach((element, i, arr) => {
      if (i == 0) {
        this.model.location.name = element.long_name;
      }
      if(element.types[0]=='locality' || element.types[0]=='administrative_area_level_3' ||  element.types[0]=='postal_town'||  element.types[0]=='sublocality_level_1'){
        this.model.location.city = element.long_name;
      }

      if(element.types[0]=='administrative_area_level_1'){
        this.model.location.province = element.long_name;
      }

      if(element.types[0]=='country'){
        this.model.location[element.types[0]] = element.long_name;
      }
    });



  }
/**
 * If the Google Place API did not load, then change the placeholder message to only ask for a city (or country?).
 */
  googlePlaceNoLoad(){
    this.locationPlaceHolder = 'City'
  }

  /**
   * If user presses enter on location button, don't allow the form to submit because we still need to pull the location Data from Google Maps.
   */
  keyDownHandler(event: Event) {

    if((<KeyboardEvent>event).keyCode == 13) {

      event.preventDefault();
    }
    //TODO! Change this, allow user to submit with enterButton.
  }

  onSubmit(form: NgForm){

    this.subscriber.action = 'preview_scholarship';
    this.subscriber.preview_choices = this.model;


    this.firebaseService.saveUserAnalytics(this.subscriber,'preview_scholarship')
      .then(res => {
        console.log('res')
        },
        err => {console.log(err)});

    if (this.model.previewMode == 'universalSearch') {
      if (!this.model.searchString) {
        this.model.errors = 'Please enter at least one field.';
      }
    }

    else if (this.model.previewMode == 'classicSearch') {

      if (form.value['education_field'].length==0 && form.value['education_level'].length==0 && form.value['location'] == '') {
        this.model.errors = 'Please enter at least one field.';
      }

      else {
        delete this.model.errors;
      }
    }




    // TODO What's the proper way of saving form values with Google Analytics

    this.googleAnalyticsEventService.emitEvent("userCategory", "previewAction", JSON.stringify(this.model.location), 1)


    this.scholarshipService.setScholarshipPreviewForm(this.model)
      .then(
      res => {
        if (this.model.previewMode == 'universalSearch') {
          this.router.navigate(['scholarship'], { queryParams: { q: this.model.searchString }});
        }
        else {
          this.router.navigate(['scholarship'])
        }

      })  //use promise to ensure that form is saved to Service before navigating away

}

  addSubscriber(event?: KeyboardEvent) {

    if(!this.subscriber.email) {
      this.subscriber.response ='Please enter email.';
      return;
    }

    if(event){
      event.preventDefault();
      this.subscriber.dialog_open_event = event.key;
    }
    else {
      this.subscriber.dialog_open_event = 'ButtonClick';
    }



    this.subscriber.utm_source =       'preview_scholarships';
    let dialogRef = this.dialog.open(SubscriberDialogComponent, {
      width: '300px',
      data: this.subscriber,
    });

    dialogRef.afterClosed().subscribe(
      result => {
              this.subscriber = result;

              if (this.subscriber) {
              this.subscriber.dialog_submit_event = result.dialog_submit_event || 'ButtonClick';

                this.firebaseService.addSubscriber(this.subscriber)
                  .then(res => {
                      this.subscriber.response ='Successfully subscribed to Atila 😄.';
                    },
                    err => this.subscriber.response ='Add Subscriber error, try again.')
              }
              else {
                this.subscriber = {};
                this.subscriber.response ='Please enter subscription information 😄.';
              }

            });




  }


  toggleSearchModal(data?:any){

    // disable search Modal until we figure out how to make it less annoying

    if(this){
      return;
    }
    if(data && data['toggle']) {
      const isOpen = this.popover.isOpen();
      if(isOpen){
        this.popover.close()
      }
      else{
        this.popover.open()
      }
      return;
    }

    // TODO check to see if we have already asked user to prevent repetitve asking
    // if(this.userProfile) {
    //   if (!this.userProfile.preferences['try_search_reminder']) {
    //     this.userProfile.preferences['try_search_reminder'] = new Date().getTime();
    //     this.userProfileService.updateHelper(this.userProfile).subscribe();
    //   }
    //   else {
    //     return;
    //   }
    // }

    const isOpen = this.popover.isOpen();
    if(isOpen){
      this.popover.close()
    }
    else{
      this.popover.open()
    }
  }

  typeaheadEvent(event) {
    console.log({event})
    if (event.type='searchString')
    this.model[event.type] = event.event.item;
  }

}
