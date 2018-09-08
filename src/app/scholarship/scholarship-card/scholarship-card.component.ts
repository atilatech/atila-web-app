import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import { trigger, state, animate, transition, style } from '@angular/animations';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-scholarship-card',
  templateUrl: './scholarship-card.component.html',
  styleUrls: ['./scholarship-card.component.scss'],
  animations: [
    trigger('hideCard', [
      state('true', style({ opacity: 0, transform: 'scale(0.0)'  })),
      state('false' , style({ opacity: 1, transform: 'scale(1.0)' })),
      transition('* => *', animate('.5s ease-in'))
    ])
  ],
})
export class ScholarshipCardComponent implements OnInit, OnDestroy {

  //todo change to only handle one scholarship
  @Input() scholarship: any;
  @Input() metadata: any = {};
  @Output() handleClick:EventEmitter<any> = new EventEmitter();
  alreadySaved: boolean;
  hideCard: boolean;
  userScholarship: any;
  environment = environment;
  @ViewChild('scholarshipCard') scholarshipCardRef: ElementRef;
  constructor(
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

    if ('2019-01-01T00:00:00Z' == this.scholarship.deadline) {
      this.scholarship['metadata']['deadline_tbd'] = 'TBA';
    }

  }

  ngOnDestroy() {
    if( typeof jQuery !== 'undefined' ) {
      $(window).off('DOMContentLoaded load resize scroll')
    }
  }

  webShare() {
    // if(this.userProfile && (this.userProfile.user == 4 || this.userProfile.user == 1)) {

      if ((<any>navigator).share) {
        (<any>navigator).share({
          title: 'Scholarship From Atila - '+ this.scholarship.name,
          text: 'Have you seen this scholarship from Atila: https://atila.ca/scholarship/'+this.scholarship.slug,
          url: 'https://atila.ca/scholarship/'+this.scholarship.slug,
        })
          .then(() => {})
          .catch((error) => {});
      }

  }

  logNotInterested() {

    setTimeout( (args) => {
      $('#scholarship-card-'+this.scholarship.id).css('display', 'none');
    }, 700);

    // removed in open mode
  }

  clickHandler(event) {

    // removed in open mode
  }

  logShareType(sharingType) {
    // removed in open mode
  }

  addToMyScholarship() {
    // removed in open mode

    this.snackBar.open('Not Available in Open Mode', 'Visit Atila.ca')
      .onAction().subscribe(
      () => {
        window.location.href = 'https://atila.ca';
      },
    );
  }




  }



