import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function(){
      $('iframe#lazy-load-fb-like').attr('src', 'https://www.facebook.com/v2.11/plugins/like.php?app_id=401124503672116locale=en_US&amp;sdk=joey&amp;share=true&amp;show_faces=true&amp;size=large&amp;fb_ref=navbar&fb_source=atila_navbar');
    });

  }

}
