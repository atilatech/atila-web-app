import { Component, OnInit } from '@angular/core';
import { MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public userProfile: {};

  public user = {
    username: '',
    email: '',
  };

  userId: any;

  authService = {
    isLoggedIn: false
  };

  public query: any;
  constructor(
    public snackBar: MatSnackBar,
    public router: Router,

  ) { }

  ngOnInit() {

    // Removed for demo purposes
    /*
    this.authService.isLoggedIn =false;
    this.userId =  this.authService.decryptLocalStorage('uid');


    if (this.userProfileService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.authService.isLoggedIn = true;
    }

    if (this.authService.decryptLocalStorage('uid')) {
      this.isLoggedIn = true;
      this.authService.isLoggedIn = true;
    }

    if(this.isLoggedIn){
      this.userProfileService.getById(parseInt(this.authService.decryptLocalStorage('uid')))
      .subscribe(

        data => {
          this.userProfile = data;



        },
      )
    }
    */




  }

  logout() {
    this.isLoggedIn = false;

    let snackBarRef = this.snackBar.open("Successfully logged out", 'Log In', {
      duration: 3000
    });

    snackBarRef.onAction().subscribe(
      () => {

        this.router.navigate(['login']);
      },
      err =>  {}
    )

    this.router.navigate([''])
    localStorage.clear();
  }

  search(query) {
    this.query = null;
    this.router.navigateByUrl(`search?q=${query}&q_source=navbar`);

  }


}
