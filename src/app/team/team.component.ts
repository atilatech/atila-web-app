import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teamData: any[] = [
    {
      "first_name": "Tomiwa",
      "last_name": "Ademidun",
      "username": "tomiwa",
      "position": "Founder",
      "img_url": "https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/user-profiles%2F1%2Fprofile-pictures%2Ffacebook-profile-picture.jpg?alt=media&token=143797ab-ef34-4a67-91d1-f55504f5b726",
      "description_1": "Tomiwa is currently taking a year off a dual degree in software engineering and business at Ivey Business School in Canada to start Atila.",
      "description_2": "He enjoys playing soccer and is a big Arsenal F.C. fan.",
      "link_type": "Website",
      "link_url": "http://tomiwa.ca"
    },
    {
      "first_name": "Manpreet",
      "last_name": "Singh",
      "username": "matharumanpreet",
      "position": "Engineering",
      "img_url": "https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.0-9/10351170_861597783896802_6247911242716139928_n.jpg?_nc_cat=0&oh=2d40c6644fd49171777dca2d581f4a27&oe=5B80F83E",
      "description_1": "Manpreet is currently studying computer technology at Seneca College.",
      "description_2": "Prior to Atila, Manpreet worked at RBC as a software developer.",
      "link_type": "LinkedIn",
      "link_url": "https://ca.linkedin.com/in/matharumanpreet"
    },
    {
      "first_name": "Kitan",
      "last_name": "Ademidun",
      "position": "Engineering + Marketing",
      "username": "orekitan",
      "img_url": "https://scontent.fyto1-1.fna.fbcdn.net/v/t1.0-9/14237540_1196065180456920_3858531177241864113_n.jpg?oh=c8bc19db36d39f67779e3f7255b99a2e&oe=5B4B7162",
      "description_1": "Kitan is currently studying software engineering and is in the AEO program at Ivey Business School",
      "description_2": "Prior to Atila she worked at AXA Mansard, a Nigerian insurance company.",
      "link_type": "LinkedIn",
      "link_url": "https://www.linkedin.com/in/kitan-ademidun-881330149/"
    },
    {
      "first_name": "Ann",
      "last_name": "Mathulla",
      "username": "AnnMathulla",
      "position": "Product Manager",
      "img_url": "https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.0-9/15178296_963120957154483_6847353746981618246_n.jpg?_nc_cat=0&oh=1430b348d5c3544ebbcc78104382b4a1&oe=5B7A3970",
      "description_1": "Ann is currently studying business at Smith school of Business, Queen's University. She's also the recipient of the Queen's Chancellor scholarship.",
      "description_2": " Last summer, she worked at Financeit, an edtech startup acquired by Goldman Sachs.",
      "link_type": "LinkedIn",
      "link_url": "https://ca.linkedin.com/in/ann-mathulla"
    },
  ];

  constructor() {

    /*
    let metaTags = {
      title: 'Meet the Atila Team',
      description: 'Meet the people helping build Atila.',
      image: 'https://firebasestorage.googleapis.com/v0/b/atila-7.appspot.com/o/public%2Fatila-team-header-2-new.png?alt=media&token=877be9e1-a694-44f8-8b31-f77e0d6958dc',
      slug: 'team',
    };
    seoService.generateTags(metaTags);

    */
  }

  ngOnInit() {

  }

}
