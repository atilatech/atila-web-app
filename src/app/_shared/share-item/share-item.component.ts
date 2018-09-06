import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-share-item',
  templateUrl: './share-item.component.html',
  styleUrls: ['./share-item.component.scss']
})
//todo change to a component that can also like and scroll to view comments
export class ShareItemComponent implements OnInit {

  @Input() item:any = {};
  @Input() itemCopy:any = {};
  @Input() metadata:any = {};
  shareItemStyle = {
    'left': '225px',
    'bottom': '1px',
  } ;

  constructor(
  ) { }

  ngOnInit() {

    this.shareItemStyle = this.metadata.shareItemStyle || this.shareItemStyle;
  }

  logShareType(sharingType) {
    this.itemCopy.share_type = sharingType;
    this.itemCopy.item_type = this.item.type;
    this.itemCopy.item_id= this.item.id;
    this.itemCopy.share_source= this.item.source;
  }

  webShare() {

    // if(this.userProfile && (this.userProfile.user == 4 || this.userProfile.user == 1)) {


      if ((<any>navigator).share) {

        this.logShareType('web_share_api');
        (<any>navigator).share({
          title: this.item.title,
          text: +this.item.title,
          url: this.item.url,
        })
          .then(() => {})
          .catch((error) => {});
      }
    }


}
