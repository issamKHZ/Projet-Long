import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  showIt: boolean = false;
  showSideBar : string = "false";
  @Output() newItemEvent = new EventEmitter<string>();
  appName !: string;

  constructor(private router: Router,
              private authService: AuthService,
              private cookieService: CookieService) {
                this.appName = this.cookieService.get('appName');
              }

  ShowSideBar() {
    if (this.showSideBar === "true") {
      this.showSideBar = "false";
    } else {
      this.showSideBar = "true";
    }
    this.newItemEvent.emit(this.showSideBar);
  }

  login() {
    this.router.navigate(['/login-page']);
  }

  isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  LogOut(): any{
    this.authService.LogOut();
    this.router.navigate(['/']);
  }
}
