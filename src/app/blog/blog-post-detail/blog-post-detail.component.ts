import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogPostService} from "../../_services/blog-post.service";

import {BlogPost} from "../../_models/blog-post";

import {UserProfileService} from '../../_services/user-profile.service';


import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';

import { MatSnackBar} from '@angular/material';
import {SearchService} from '../../_services/search.service';
import {genericItemTransform, IPDATA_KEY} from '../../_shared/utils';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.scss']
})
export class BlogPostDetailComponent implements OnInit, OnDestroy {

  //commentType ="Forum";
  blogPost: BlogPost;
  relatedItems: any = [];
  subscriber: any = {};
  slugUsername: any = {};
  slugTitle: any = {};
  routerChanges: Subscription;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public userProfileService: UserProfileService,
              public blogPostService: BlogPostService,
              public snackBar: MatSnackBar,
              public searchService: SearchService,)
              {
                this.routerChanges = router.events.subscribe(data=>{
                  if(data instanceof ActivationEnd){


                    if (this.userProfileService.viewHistoryChanges) {
                      this.userProfileService.viewHistoryChanges.unsubscribe();
                    }
                    this.slugUsername = data.snapshot.params['username'];
                    this.slugTitle = data.snapshot.params['slug'];

                    this.ngOnInitHelper();
                  }
                });
              }

  ngOnInitHelper() {

    if (!this.slugUsername || !this.slugTitle) {
      return;
    }
    let slugCopy = {username:this.slugUsername, title:this.slugTitle};

    this.blogPostService.getBySlug(this.slugUsername, this.slugTitle).subscribe(
      res => {
        this.blogPost = (<any>res).blog;

        this.getRelatedItems();
        console.log('this.route',this.route,this.route.snapshot);
        if (this.route.snapshot.fragment){
          setTimeout(() => {
            this.scrollToElement('#'+this.route.snapshot.fragment);
          }, 500);
        }

      },
      err => {
        let snackBarRef = this.snackBar.open("Blog Post Not Found.", 'Try User\'s Blogs', {
          duration: 5000
        });

        // this.slugUsername keeps appearing as undefined
        snackBarRef.onAction().subscribe(
          () => {
            this.router.navigate(['blog',slugCopy.username]);
          });

        setTimeout(() => {
          this.router.navigate(['blog',slugCopy.username]);
        }, 500);
      }

    );

  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.routerChanges.unsubscribe();
  }


  scrollToComments() {
    $("html, body").animate({scrollTop: $('.comment-box').offset().top}, 1000);
  }
  scrollToElement(selector) {
    try{
      console.log('scrollToElement',this.scrollToElement);
      $("html, body").animate({scrollTop: $(selector).offset().top}, 1000);
    }
    catch(e) {
      console.log('scrollToElement catch e',e);

    }
  }

  trackByFn(index: any, item: any) {
    return index;

  }

  getRelatedItems() {
    let queryString= `?type=blog&id=${this.blogPost.id}`;

    this.searchService.relatedItems(queryString)
      .subscribe( res => {
        this.relatedItems = res.items.map( item => {
          return genericItemTransform(item);
        });

        this.relatedItems = this.relatedItems.slice(0,3);


      });
  }

}
