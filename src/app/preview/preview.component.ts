import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

import {ScholarshipService} from '../_services/scholarship.service';

import {Router} from '@angular/router';
import {GoogleAnalyticsEventsService} from '../_services/google-analytics-events.service';
import {MatDialog} from '@angular/material';
import {SubscriberDialogComponent} from '../subscriber-dialog/subscriber-dialog.component';
import {MyFirebaseService} from '../_services/myfirebase.service';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../_services/auth.service';
import {genericItemTransform, prettifyKeys, toTitleCase} from '../_shared/utils';
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
    public education_level: string[],
    public education_field: string[],
    public errors: string,
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
      'title': 'How to Get a Summer Internship',
      'user': {
        'first_name': 'Trevor',
        'last_name': 'Sookraj',
        'username': 'trevorsookraj',
        'profile_pic_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F629%2Fprofile-pictures%2Ftrevor-sookraj.jpg?alt=media&token=ebf88b32-8a18-4bd5-83e6-d33fcf112a9d',
        'title': '',
        'post_secondary_school': 'Western University',
        'secondary-school': '',
        'id': 629
      },
      'slug': 'how-to-get-a-summer-internship',
      'description': 'Students generally have limited work experience, so it may seem impossible to get an internship. Through this process, I faced a few obstacles to getting an internship and learned how to overcome them. Here is what I learned',
      'header_image_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/blogs%2F20%2Fheader_image_url%2Fshopify-internship.jpg?alt=media&token=f391b5d5-c55e-4424-a870-98786189e9d6',
      'id': 20
    },
    {
      'id': 13,
      'title': 'Getting into Medical School Without a Degree, Advice for Pre Med Students, Work Life Balance and Self Care - Emily Chen - Atila TV 001',
      'slug': 'getting-into-medical-school-without-a-degree-advice-for-pre-med-students-work-life-balance-and-self-care-emily-chen-atila-tv-001',
      'alternate_slugs': [],
      'date_created': '2018-10-25T12:36:58.298444Z',
      'description': 'Emily Chen shares how she got into U of T medical school without a degree, advice for students studying pre med programs and the importance of work life balance and self care.',
      'header_image_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/blogs%2F13%2Fheader_image_url%2Fpasted%20image%200.png?alt=media&token=82d01850-c040-4c68-8847-1842f54ef75a',
      'published': true,
      'up_votes_count': 0,
      'down_votes_count': 0,
      'up_votes_id': [],
      'down_votes_id': [],
      'metadata': {},
      'user': {
        'first_name': 'Tomiwa',
        'last_name': 'Ademidun',
        'username': 'tomiwa',
        'profile_pic_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F1%2Fprofile-pictures%2Ffacebook-profile-picture.jpg?alt=media&token=8754c657-bbdc-4d8e-ae1d-d4047ac09c6d',
        'title': 'Software Engineering Student',
        'post_secondary_school': 'University of Western Ontario',
        'secondary-school': '',
        'id': 1
      },
      'contributors': []
    },
    {
      'id': 19,
      'title': 'Bain Consulting, RBC Investment Banking, Ivey Business School and Why he declined Goldman Sachs: Paul Okundaye — Atila TV 006',
      'slug': 'bain-consulting-rbc-investment-banking-ivey-business-school-and-why-he-declined-goldman-sachs-paul-okundaye-atila-tv-006',
      'alternate_slugs': [],
      'date_created': '2019-03-21T14:22:30.682253Z',
      'description': 'Paul is an incoming management consultant at Bain and Company.' +
      ' Before that he was an investment banking summer analyst at RBC after declining an interview at Goldman Sachs and founder of ' +
      'a food delivery company called Dine Easy. ' +
      'He is currently in his final year in the honours business program at the Ivey Business School.',
      'header_image_url': 'https://cdn-images-1.medium.com/max/1600/0*h479gzY6kiJje0AH',
      'user': {
        'user': 608,
        'first_name': 'Aurorita',
        'last_name': 'Mahbub',
        'username': 'auroritam',
        'profile_pic_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F608%2Fprofile-pictures%2FIMG_3146.jpg?alt=media&token=9086848b-ec09-4b39-ad7a-58893519bcbf',
        'title': '',
        'profile_description': '',
        'secondary_school': '',
        'post_secondary_school': '',
        'public_metadata': {}
      },
      'contributors': []
    },
  ];

  forums = [
    {
      'id': 7,
      'starting_comment': {
        'title': 'Queen\'s Chancellor Recipient 2016 and Queen\'s Commerce AMA',
        'username': 'AnnMathulla',
        'text': 'Hi everyone, \r\n\r\nMy name is Ann, and I was fortunate enough to win the Queen\'s Chancellor Scholarship in 2016. Currently I\'m in second year in the Queen\'s Commerce Program, and next year I will be spending one semester at the National University of Singapore, very excited! \r\n\r\nI know university and scholarship applications can be very stressful (trust me, I\'ve been there!), and I hope that sharing some of my experiences will help you as you navigate your way through this stressful yet exciting time! \r\n\r\nIf you have any questions about Queen\'s Commerce, the Chancellor\'s Scholarship or anything else feel free to ask! I\'m happy to help in any way that I can :)',
        'up_votes_count': 0,
        'down_votes_count': 0,
        'id': 17,
        'up_votes_id': []
      },
      'title': 'Queen\'s Chancellor Recipient 2016 and Queen\'s Commerce AMA',
      'slug': 'queens-chancellor-recipient-2016-and-queens-commerce-ama',
      'date_created': '2018-02-05T01:52:12Z',
      'metadata': {},
      'user': {
        'first_name': 'Ann',
        'last_name': 'Mathulla',
        'username': 'AnnMathulla',
        'profile_pic_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F72%2Fprofile-pictures%2FHead%20Shot.jpg?alt=media&token=65ebd302-8c46-4b7e-b748-e8910c345ce6',
        'title': '',
        'post_secondary_school': 'Queen\'s University',
        'secondary-school': '',
        'id': 72
      }
    },
    {
      'id': 9,
      'starting_comment': {
        'title': 'Deciding between Kinesiology, Health Studies or Medical Science',
        'username': 'thinkr',
        'text': 'Hi everyone, \r\nI\'m a Grade 12 student in the process of deciding on a university program. My current options are Health Studies, Kinesiology, and Medical Science.\r\n\r\n I know that I’m interested in science and the health care field in general, but I don\'t want to box myself into any specific career at this point in time. I want to explore and do some shadowing before I decide on a professional program (i.e. physical therapy, pharmacy, medicine and dentistry) or other graduate studies.\r\n\r\nI am leaning towards Medical Science, but I\'m concerned that if I decide not to do Medicine, I won\'t have anything to fall back on. That being said, are there any tips or advice anyone has for selecting a program in this beginning stage of my post-secondary pathway?\r\n\r\nI would also appreciate the perspective of individuals currently in these respective fields of study or in their practice. What are three things that you like about the field, and three things you dislike about it?',
        'up_votes_count': 0,
        'down_votes_count': 0,
        'id': 20,
        'up_votes_id': []
      },
      'title': 'Deciding between Kinesiology, Health Studies or Medical Science',
      'slug': 'deciding-between-kinesiology-health-studies-or-medical-science',
      'date_created': '2018-03-14T12:34:38Z',
      'metadata': {
        'comments_count': 3
      },
      'user': {
        'first_name': 'Paula',
        'last_name': 'M.',
        'username': 'thinkr',
        'profile_pic_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2Fgeneral-data%2Fdefault-profile-pic.png?alt=media&token=455c59f7-3a05-43f1-a79e-89abff1eae57',
        'title': '',
        'post_secondary_school': '',
        'secondary-school': '',
        'id': 101
      }
    },
    {
      'id': 5,
      'starting_comment': {
        'title': 'Should I study Computer Science, Software, or Computer Engineering',
        'username': 'zoginni',
        'text': 'I\'m a high school senior looking to study Software engineering, Computer science or Computer engineering. The schools I\'m looking at offer SE and CE as a second-year option, which is available after a general first year. My interest lies mostly in software, but I\'d also like to learn the hardware side of it computer systems as well. \n\nIf I take CS, on the off chance that I don’t like it, I don’t want to end up in a position where I can only do another math/science major. \n\nWith the general year, however, if I just end up picking software anyways I think I would feel as if I wasted that year when I could have had a year of coding down in CS. With that year of coding, I could be looking at working for a term or I could focus on building my own project portfolio.\n\nSo, in general: If I take general engineering first I may be able to drop into CS, but I would be behind. But if I don’t like CS I can’t go into engineering at all. Which major should I pick if my goal right now is to work in software? ',
        'up_votes_count': 0,
        'down_votes_count': 0,
        'id': 6,
        'up_votes_id': []
      },
      'title': 'Should I study Computer Science, Software, or Computer Engineering',
      'slug': 'should-i-study-computer-science-software-or-computer-engineering',
      'date_created': '2018-01-19T22:13:43.648669Z',
      'metadata': {
        'comments_count': 6
      },
      'user': {
        'first_name': 'Zion',
        'last_name': 'Oginni',
        'username': 'zoginni',
        'profile_pic_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/' +
        'user-profiles%2F39%2Fprofile-pictures%2FIMG_7111.JPG?alt=media&token=e3088001-19a0-4ebf-8172-80df143d8977',
        'title': 'High School Senior',
        'post_secondary_school': 'Queen\'s University',
        'secondary-school': '',
        'id': 39
      }
    },
  ];

  essays = [
    {
      'title': 'Ivey AEO2 Activity Report 2017',
      'user': {
        'first_name': 'Carol',
        'last_name': 'Li',
        'username': 'carolli',
        'profile_pic_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/' +
        'user-profiles%2F633%2Fprofile-pictures%2Fcarol-li.jpg?alt=media&token=c773b2f0-1275-4ec6-b4f0-e13388aa47c8',
        'title': '',
        'post_secondary_school': 'Ivey Business School',
        'secondary-school': '',
        'id': 633
      },
      'slug': 'ivey-aeo2-activity-report-2017',
      'description': 'My AEO2 activity report for Ivey Business School. ' +
      'This is a report of extra curricular activities I participated in while in university in the AEO program ' +
      'as part of my progression requirements for starting the HBA program in 3rd year.',
      'id': 8,
      'essay_source_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/' +
      'user-profiles%2F1%2Fessays%2F8%2FIvey%20AEO2%20Activity%20Report.pdf?alt=media&token=84488d88-074e-46a1-8d07-a15b386ac059'
    },
    {
      'id': 5,
      'title': 'Next36 Application 2018',
      'slug': 'next36-application-2018',
      'date_created': '2019-03-27T15:04:15Z',
      'description': 'My application for the Next36, an accelerator for young entrepreneurs in Canada. Me and my startup, ' +
      'The Path were selected to participate in the program.',
      'status': 'accepted',
      'status_other': '',
      'essay_source_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F1%2Fessays%2F5%2FNext%2036%20App.pdf?alt=media&token=0a2a07ae-05f2-4ee9-ae5c-5b31044489fe',
      'published': true,
      'up_votes_count': 0,
      'down_votes_count': 0,
      'up_votes_id': [],
      'down_votes_id': [],
      'metadata': {},
      'user': {
        'first_name': 'Trevor',
        'last_name': 'Sookraj',
        'username': 'trevorsookraj',
        'profile_pic_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F629%2Fprofile-pictures%2Ftrevor-sookraj.jpg?alt=media&token=ebf88b32-8a18-4bd5-83e6-d33fcf112a9d',
        'title': '',
        'post_secondary_school': '',
        'secondary-school': '',
        'id': 629
      },
      'contributors': []
    },
    {
      'id': 7,
      'title': 'LORAN SCHOLARS PROGRAM Application 2014',
      'slug': 'loran-scholars-program-application-2014-',
      'date_created': '2019-03-27T16:11:50Z',
      'description': 'My application for the 2014 Loran Scholars program. I was not selected for this award.',
      'status': 'declined',
      'status_other': '',
      'essay_source_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/' +
      'user-profiles%2F1%2Fessays%2F7%2FLoran%20Application.pdf.pdf?alt=media&token=3a5f73fd-9259-429b-a981-fffc8f3df03f',
      'published': true,
      'up_votes_count': 0,
      'down_votes_count': 0,
      'up_votes_id': [],
      'down_votes_id': [],
      'metadata': {},
      'user': {
        'first_name': 'Paul',
        'last_name': 'Okundaye',
        'username': 'OkPaul',
        'profile_pic_url': 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/' +
        'user-profiles%2F626%2Fprofile-pictures%2Fpaul-profile-picture.png?alt=media&token=60650357-56f2-4a97-8416-08b08fbbc4aa',
        'title': '',
        'post_secondary_school': '',
        'secondary-school': '',
        'id': 626
      },
      'contributors': []
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
  }, [], [], '');

  sampleSearches = [
    'Engineering',
    'Female',
    'Ontario',
    'Toronto',
    'Black',
    'Medical School',
  ];

  /**
   * If the Google Places API is not working, only ask for city.
   */
  public locationPlaceHolder = 'City, Province or Country';
  public subscriber: any = {};

  lazyLoadGifIds = ['#registration-gif', '#create-profile-gif', '#view-scholarships-gif',
    '#scholarship-notifications-gif','#view-essays-gif', '#application-automation-gif'];
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

    const self = this;

    $(function () {

      for (let i = 0; i < self.lazyLoadGifIds.length; i++) {

        const gifFileName = self.lazyLoadGifIds[i].replace('#', '').replace('-gif','.gif')
        const gifFilePath = `../../assets/img/landing-page/${gifFileName}`;
        $(self.lazyLoadGifIds[i]).attr('src', gifFilePath);
      }

      $('iframe.lazy-load-element').attr('src', '//www.youtube.com/embed/c_K4342WMwQ?cc_load_policy=1');

    });

    this.blogs = this.blogs.map( item => genericItemTransform(item));

    this.essays = this.essays.map( item => genericItemTransform(item));

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
  placeAutoComplete(placeResult: any, locationModel: NgModel) { //Assign types to the parameters place result is a PlaceResult Type, see documentation


    this.predictLocation(this.model.location, placeResult);

  }

  /**
   * Translate the PlaceResult object into an Atila location object, containing only the city, province/state and country.
   * @param location
   * @param placeResult
   */
  predictLocation(location, placeResult) {
    const addressComponents = placeResult.address_components;

    const keys = ['city', 'province', 'country'];

    //TODO: Find a more elegant solution for this.


    addressComponents.forEach((element, i, arr) => {
      if (i == 0) {
        this.model.location.name = element.long_name;
      }
      if (element.types[0] == 'locality' || element.types[0] == 'administrative_area_level_3' || element.types[0] == 'postal_town' || element.types[0] == 'sublocality_level_1') {
        this.model.location.city = element.long_name;
      }

      if (element.types[0] == 'administrative_area_level_1') {
        this.model.location.province = element.long_name;
      }

      if (element.types[0] == 'country') {
        this.model.location[element.types[0]] = element.long_name;
      }
    });


  }

  /**
   * If the Google Place API did not load, then change the placeholder message to only ask for a city (or country?).
   */
  googlePlaceNoLoad() {
    this.locationPlaceHolder = 'City'
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

  onSubmit(form: NgForm) {

    this.subscriber.action = 'preview_scholarship';
    this.subscriber.preview_choices = this.model;

    if (this.model.previewMode == 'universalSearch') {
      if (!this.model.searchString) {
        this.model.errors = 'Please enter a search term.';
        return
      }
      else {
        delete this.model.errors;
      }
    }

    else if (this.model.previewMode == 'classicFilter') {

      if (this.model['education_field'].length == 0 && this.model['education_level'].length == 0 && this.model['location']['name'] == '') {
        this.model.errors = 'Please enter at least one field.';
        return
      }

      else {
        delete this.model.errors;
      }
    }

    this.firebaseService.saveUserAnalytics(this.subscriber, 'preview_scholarship')
      .then(res => {
        },
        err => {
          console.log(err)
        });


    // TODO What's the proper way of saving form values with Google Analytics

    this.googleAnalyticsEventService.emitEvent('userCategory', 'previewAction', JSON.stringify(this.model.location), 1)


    this.scholarshipService.setScholarshipPreviewForm(this.model)
      .then(
        res => {
          if (this.model.previewMode == 'universalSearch') {
            this.router.navigate(['scholarship'], {queryParams: {q: this.model.searchString}});
          }
          else {
            this.router.navigate(['scholarship'])
          }

        })  //use promise to ensure that form is saved to Service before navigating away

  }

  addSubscriber(event?: KeyboardEvent) {

    if (!this.subscriber.email) {
      this.subscriber.response = 'Please enter email.';
      return;
    }

    if (event) {
      event.preventDefault();
      this.subscriber.dialog_open_event = event.key;
    }
    else {
      this.subscriber.dialog_open_event = 'ButtonClick';
    }


    this.subscriber.utm_source = 'preview_scholarships';
    const dialogRef = this.dialog.open(SubscriberDialogComponent, {
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
                this.subscriber.response = 'Successfully subscribed to Atila 😄.';
              },
              err => this.subscriber.response = 'Add Subscriber error, try again.')
        }
        else {
          this.subscriber = {};
          this.subscriber.response = 'Please enter subscription information 😄.';
        }

      });


  }


  toggleSearchModal(data?: any) {

    // disable search Modal until we figure out how to make it less annoying

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
    if (isOpen) {
      this.popover.close()
    }
    else {
      this.popover.open()
    }
  }

  typeaheadEvent(event) {
    if (event.type = 'searchString')
      this.model[event.type] = event.event.item;
  }

}
