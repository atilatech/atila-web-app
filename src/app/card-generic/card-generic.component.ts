import {Component, Input, OnInit} from '@angular/core';
import {toTitleCase} from '../_shared/utils';
@Component({
  selector: 'app-card-generic',
  templateUrl: './card-generic.component.html',
  styleUrls: ['./card-generic.component.scss']
})
export class CardGenericComponent implements OnInit {

  @Input() item: any;
  @Input() metadata = {
    showImageInPreviewMode: false,
    showEssayImage: false,
    hideDescription: null,
  };
  @Input() cardStyle: any = {'max-height': '500px', 'overflow-y': 'hidden'};
  @Input() cardTitleStyle: any = {};
  @Input() imageStyle: any = {};
  @Input() titleMaxLength = 75;
  @Input() previewDescriptionLength = 280;

  previewDescription: boolean;
  constructor() {}

  ngOnInit() {

    const defaultTitleStyle = {'max-height': this.item.image && !this.previewDescription ? '250px' : null};

    this.cardTitleStyle = {...this.cardTitleStyle, ...defaultTitleStyle};
    if (this.metadata.hideDescription == null){
      this.metadata.hideDescription = !!this.item.image;
    }
  }

  togglePreview() {
    this.previewDescription=!this.previewDescription;
    this.cardStyle['overflow-y'] = this.previewDescription ? 'scroll': 'hidden';

  }

  toTitleCase(str) {
    return toTitleCase(str);
  }



}
