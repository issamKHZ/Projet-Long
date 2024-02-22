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

  constructor(private router: Router) {}

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
}
