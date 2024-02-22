import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  showSideBar !: boolean;


  decideShowingBar(decision : string) {
    if (decision === "true") {
      this.showSideBar = true;
    } else {
      this.showSideBar = false;
    }
  }
}
