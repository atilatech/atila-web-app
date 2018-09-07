import {Component, OnDestroy, OnInit, AfterViewInit} from '@angular/core';

import { Scholarship } from '../../_models/scholarship';
import { Comment, upVoteComment, downVoteComment } from "../../_models/comment";
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import { ScholarshipService } from '../../_services/scholarship.service';
import { ApplicationService } from '../../_services/application.service';
import { Observable } from 'rxjs/Observable';
import { NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { UserProfileService } from '../../_services/user-profile.service';

import {environment} from '../../../environments/environment';
import { CommentService } from '../../_services/comment.service';
import { AuthService } from "../../_services/auth.service";
import {Meta, Title} from '@angular/platform-browser';
import {MyFirebaseService} from '../../_services/myfirebase.service';
import {UserProfile, addToMyScholarshipHelper} from '../../_models/user-profile';
import {SeoService} from '../../_services/seo.service';
import {SearchService} from '../../_services/search.service';
import {genericItemTransform, IPDATA_KEY} from '../../_shared/utils';
import {SubscriberDialogComponent} from '../../subscriber-dialog/subscriber-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import {AtilaPointsPromptDialogComponent} from '../../atila-points-prompt-dialog/atila-points-prompt-dialog.component';


@Component({
  selector: 'app-scholarship-detail',
  templateUrl: './scholarship-detail.component.html',
  styleUrls: ['./scholarship-detail.component.scss']
})
export class ScholarshipDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  scholarship: Scholarship;
  scholarshipComments: Comment[];
  userComment: Comment;
  scholarshipSlug: string;
  userId: number;
  appId: number;
  json = JSON;
  userProfile: UserProfile;
  Object = Object;
  routerChanges: Subscription;
  public reviews: any[];
  public reviewsLoaded: boolean = false;
  public scholarshipOwner;
  public keyGetter = Object.keys;
  public environment = environment;
  public alreadySaved: boolean;
  public relatedItems: any = [];
  public subscriber: any = {};
  public viewHistory: any;
  public isLoggedIn;
  public preventNgOnInitDoubleCount = false;
  constructor(
    route: ActivatedRoute,
    public router: Router,
    public scholarshipService: ScholarshipService,
    public applicationService: ApplicationService,
    public _ngZone: NgZone,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public userProfileService: UserProfileService,
    public titleService: Title,
    public commentService: CommentService,
    public authService: AuthService,
    public metaService: Meta,
    public firebaseService: MyFirebaseService,
    public seoService: SeoService,
    public searchService: SearchService,
  ) {
    // Get the id that was passed in the route
    this.userId = parseInt(this.authService.decryptLocalStorage('uid')); // Current user, TODO: Should we use the request user ID?


    //reload the url if a new slug is clicked from related items
    this.routerChanges = router.events.subscribe(data=>{
      if(data instanceof ActivationEnd){

        console.log('this.viewHistoryChanges',this.userProfileService.viewHistoryChanges);

        if (this.userProfileService.viewHistoryChanges) {
          this.userProfileService.viewHistoryChanges.unsubscribe();
        }
        this.scholarshipSlug = route.snapshot.params['slug'];
        this.ngOnInitHelper();
        console.log('routerChanges',data);
      }
    });



  }

  ngOnInitHelper() {

    if (this.userProfileService.viewHistoryChanges) {
      this.userProfileService.viewHistoryChanges.unsubscribe();
    }
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

          this.seoService.generateTags({
            title: this.scholarship.name,
            description: this.scholarship.description,
            image: this.scholarship.img_url,
            slug: `scholarship/${this.scholarship.slug}/`
          });


          if ('2019-01-01T00:00:00Z' == this.scholarship.deadline) {
            this.scholarship['metadata']['deadline_tbd'] = 'TBA';
          }

          this.titleService.setTitle(this.scholarship.name + ' - Atila');

          this.getRelatedItems();

          //this.updateMeta();
          // Get the user profile of the scholarship owner
          if (this.scholarship.owner){
            this.userProfileService.getById(scholarship.owner)
              .subscribe(
                user => {
                  this.scholarshipOwner = user;

                },
                err => {

                }
              )
          }

          if (!isNaN(this.userId)) {
            this.userProfileService.getById(this.userId)
              .subscribe(
                res => {
                  this.userProfile = res;

                  setTimeout(()=>{
                    if(this.scholarship) {
                      let viewData = {
                        item_type: 'scholarship',
                        item_id: this.scholarship.id,
                        item_name: this.scholarship.name,
                        timestamp: Date.now(),
                      };
                      console.log('this.userProfileService.checkViewHistory');
                      this.userProfileService.checkViewHistory(this.userProfile, viewData);
                    }
                  },3000);
                  if(this.userProfile && this.userProfile.saved_scholarships) {

                    for (let i =0; i<this.userProfile.saved_scholarships.length; i++) {
                      if (this.userProfile.saved_scholarships[i] == this.scholarship.id) {
                        this.alreadySaved = true;
                        break;
                      }
                    }

                  }
                },
              )
          }

        },
        err => {

        },

        () => {
          this.getScholarshipComments();
        }
      );
  }

  ngOnInit() {

  }

  ngAfterViewInit() {


  }


  ngOnDestroy() {
    this.routerChanges.unsubscribe();
    if (this.userProfileService.viewHistoryChanges) {
      this.userProfileService.viewHistoryChanges.unsubscribe();
    }
  }

  getScholarshipComments(){
    //create an empty UserComment object
    this.userComment = new Comment(this.userId);


    //this.scholarshipComments = new Array<Comment>();

    let postOperation = this.commentService.getComments(this.scholarship.id,'Scholarship');

    postOperation.subscribe(
      res => {

        this.scholarshipComments = res.comments;
      }
    )

  }

  postComment(){

    //prevent ScholarshipComments from tracking the changes to UserComment;
    // TODO: Consider using deepcopy of comment
    var commentTemp:Comment = new Comment(this.userId);
    commentTemp['scholarship'] = this.scholarship.id;
    commentTemp.text = this.userComment.text;
    commentTemp.title = this.userComment.title;

    let postOperation = this.commentService.create(commentTemp);

    postOperation.subscribe(
      res => {

        this.scholarshipComments.unshift(res);
      },

      err =>{
      }

    );

    this.userComment.text = "";
    this.userComment.title = "";
  }


  trackByFn(index: any, item: any) {
    return index;

  }

  getOrCreateApp() {

    if(!this.userId || isNaN(this.userId)) {
      let snackBarRef = this.snackBar.open("Account Required to Apply", 'Create Account', {
        duration: 3000
      });

      snackBarRef.onAction().subscribe(
        () => {

          this.router.navigate(['register']);
        },
        err =>  {}
      )

      return;
    }

    if(this.userId){
      var data = {
        scholarshipId: this.scholarship.id,
        userId: this.userId
      }
      let postOperation: Observable<any>;
      postOperation = this.applicationService.getOrCreateApp(data);

      postOperation
        .subscribe(
        application => {
          this.appId = application.id;
        },
        error => {

        },
        () => {


          this.router.navigate(['applications', this.appId])
        }
        )


    }
   }

  requestAutomation() {

    if(!this.userId || isNaN(this.userId)) {

      let snackBarRef = this.snackBar.open("Register to request Automation", 'Register', {
        duration: 4000
      });

      snackBarRef.onAction().subscribe(
        () => {
          this.router.navigate(['register']);
        },
      );

      return;
    }


    if(!this.scholarship.metadata['automation_requests']) {
      this.scholarship.metadata['automation_requests'] = [];
    }

    else {
      this.scholarship.metadata['automation_requests'].push(this.userId);
    }


    let sendData = {
      metadata: this.scholarship.metadata,
      id: this.scholarship.id,
    };

    let userAnalytics: any = {
      user_id: this.userId,
      scholarship_id: this.scholarship.id,
    };


    this.scholarshipService.patch(this.scholarship.id,sendData)
      .subscribe(
        res => {
          this.firebaseService.saveUserAnalytics(userAnalytics, 'automation_requests')
            .then(
              res => {
                this.snackBar.open("Request Saved", '', {
                  duration: 3000
                });

              },
              err => {
                this.snackBar.open("Error in request Automation", '', {
                  duration: 3000
                });},
            )

        }
      )


  }

  addToMyScholarships() {

    let userAnalytics:any = {};

    userAnalytics.share_type = 'save_scholarship';
    userAnalytics.share_source = 'scholarship_detail';
    userAnalytics.schoarship_id = this.scholarship.id;


    if(this.userProfile) {
      userAnalytics.user_id = this.userProfile.user;
    }
    this.firebaseService.saveUserAnalytics(userAnalytics,'scholarship_sharing');


    if (!this.userProfile) {
      let snackBarRef = this.snackBar.open("Register to Save", 'Register', {
        duration: 5000
      });

      snackBarRef.onAction().subscribe(
        () => {
          this.router.navigate(['register']);
        },
      )

      return;
    }

    if (this.alreadySaved) {
      this.snackBar.open("Already Saved", '', {
        duration: 5000
      });
      return;
    }

    let saveResult = addToMyScholarshipHelper(this.userProfile,this.scholarship);

    if(!saveResult[1]) {
      this.snackBar.open("Already Saved", '', {
        duration: 5000
      });
      return;
    }
    else {
      this.userProfile = saveResult[0];

      this.userProfileService.updateHelper(this.userProfile)
        .subscribe(
          res => {
            let snackBarRef = this.snackBar.open("Saved to My Scholarships", 'My Scholarships', {
              duration: 5000
            });

            snackBarRef.onAction().subscribe(
              () => {
                this.router.navigate(['profile',this.userProfile.username,'my-atila']);
              },
            )},
          err=> {},
        )

    }

  }


  logRelatedItemClick(item) {
    let itemCopy: any = {};
    itemCopy.item_type = item.type;
    itemCopy.title = item.title;
    itemCopy.item_id= item.id;
    itemCopy.share_source= 'scholarship_detail';
    this.firebaseService.saveUserAnalytics(itemCopy,'related_item_click');


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


  addSubscriber(event?: KeyboardEvent) {


    if(!this.subscriber.email) {
      this.subscriber.response ='Please enter email.';
      return;
    }
    // In case we want to see if people are more likely to submit by typing Enter or clicking.
    if (event) {
      this.subscriber.dialog_open_event = event.key;
    }
    else {
      this.subscriber.dialog_open_event = 'ButtonClick';
    }

    this.subscriber.utm_source =       'scholarship_detail';
    this.subscriber.utm_type =       'scholarship';
    this.subscriber.utm_id =       this.scholarship.id;
    this.subscriber.utm_title =       this.scholarship.name;

    let dialogRef = this.dialog.open(SubscriberDialogComponent, {
      width: '500px',
      data: this.subscriber,
    });


    dialogRef.afterClosed().subscribe(
      result => {
        this.subscriber = result;
        if(this.subscriber) {

          this.subscriber.dialog_submit_event = result.dialog_submit_event || 'ButtonClick';

          $.getJSON(`https://api.ipdata.co?api-key=${IPDATA_KEY}`,
            data => {
              this.subscriber.geo_ip = data;

              this.firebaseService.addSubscriber(this.subscriber)
                .then(res => {
                    this.subscriber.response ='Successfully subscribed to Atila 😄.';
                  },
                  err => this.subscriber.response ='Subscription error.');
            });
        }
        else {
          this.subscriber = {};
          this.subscriber.response ='Please enter subscription information 😄.';
        }


      });
  }

   //Make this an exported member function of comment
   upVoteComment(userId: number, comment: Comment): Comment{



    if(comment.up_votes_id.includes(userId)){


        return comment;
    }
    else{
        this['user_already_upvoted'] = true;
        comment.up_votes_count = comment.up_votes_id.push(userId);

        return comment.up_votes_count;
    }
  }
  /*
  updateMeta(){

    const fullUrl = document.location.href;

    this.metaService.updateTag({
        content: this.scholarship.name
      },
      "property='og:title'"
    );

    this.metaService.updateTag({
        content: this.scholarship.description
      },
      "property='og:description'"
    );

    this.metaService.updateTag({
        content: this.scholarship.description
      },
      "name='Description'"
    );

    this.metaService.updateTag({
        content: this.scholarship.scholarship_img_url
      },
      "property='og:image'"
    );

    this.metaService.updateTag({
        content: fullUrl
      },
      "property='og:url'"
    );


    this.metaService.updateTag({
        content: this.scholarship.name
      },
      "name='twitter:title'"
    );

    this.metaService.updateTag({
        content: this.scholarship.description
      },
      "name='twitter:description'"
    );

    this.metaService.updateTag({
        content: this.scholarship.img_url
      },
      "name='twitter:image'"
    );
    this.metaService.updateTag({
        content: fullUrl
      },
      "name='twitter:url'"
    );


    this.metaService.updateTag({
        content: this.scholarship.name
      },
      "itemprop='name'"
    );

    this.metaService.updateTag({
        content: this.scholarship.description
      },
      "itemprop='description'"
    );

    this.metaService.updateTag({
        content: this.scholarship.scholarship_img_url
      },
      "itemprop='image'"
    );

  }
  */
}
