import {Component, OnDestroy, OnInit, AfterViewInit} from '@angular/core';

import { Scholarship } from '../../_models/scholarship';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import { ScholarshipService } from '../../_services/scholarship.service';
import { MatSnackBar } from '@angular/material';

import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';
import {SearchService} from '../../_services/search.service';
import {genericItemTransform} from '../../_shared/utils';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-scholarship-detail',
  templateUrl: './scholarship-detail.component.html',
  styleUrls: ['./scholarship-detail.component.scss']
})
export class ScholarshipDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  scholarship: Scholarship;
  scholarshipSlug: string;
  json = JSON;
  Object = Object;
  routerChanges: Subscription;
  public scholarshipOwner;
  public environment = environment;
  public alreadySaved: boolean;
  public relatedItems: any = [];
  public isLoggedIn;
  public preventNgOnInitDoubleCount = false;
  constructor(
    route: ActivatedRoute,
    public router: Router,
    public scholarshipService: ScholarshipService,
    public snackBar: MatSnackBar,
    public titleService: Title,
    public searchService: SearchService,
  ) {
    // Get the id that was passed in the route


    //reload the url if a new slug is clicked from related items
    this.routerChanges = router.events.subscribe(data=>{
      if(data instanceof ActivationEnd){

        this.scholarshipSlug = route.snapshot.params['slug'];
        this.ngOnInitHelper();
        console.log('routerChanges',data);
      }
    });



  }

  ngOnInitHelper() {

    console.log('ngOnInitHelper() this.preventNgOnInitDoubleCount', this.preventNgOnInitDoubleCount)
    if (!this.preventNgOnInitDoubleCount) {
      this.preventNgOnInitDoubleCount = true;
    }
    else{
      this.preventNgOnInitDoubleCount = false;
      return;
    }

    this.scholarshipService.getBySlug(this.scholarshipSlug)
      .subscribe(
        scholarship => {

          this.scholarship = scholarship;

          if ('2019-01-01T00:00:00Z' == this.scholarship.deadline) {
            this.scholarship['metadata']['deadline_tbd'] = 'TBA';
          }

          this.titleService.setTitle(this.scholarship.name + ' - Atila');

          this.getRelatedItems();

        },
      );
  }

  ngOnInit() {

  }

  ngAfterViewInit() {


  }


  ngOnDestroy() {
    this.routerChanges.unsubscribe();
  }

  getRelatedItems() {
    console.log('getRelatedItems',this.getRelatedItems);
    let queryString= `?type=scholarship&id=${this.scholarship.id}`;

    this.searchService.relatedItems(queryString)
      .subscribe( res => {


        this.relatedItems = res.items.map( item => {
          return genericItemTransform(item);
        });

        this.relatedItems = this.relatedItems.slice(0,3);


      });
  }

  notAvailableOpenModeSnackbar() {
    this.snackBar.open('Not Available in Open Mode', 'Visit Atila.ca')
      .onAction().subscribe(
      () => {
        window.location.href = 'https://atila.ca';
      },
    );
  }

}
