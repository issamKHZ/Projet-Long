import { AuthService } from './../services/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  @Input() showMe : boolean = true;
  @Input() clique : string = 'home';
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() platform !:string;

  currentRoute: any;

  constructor(private router : Router, private authService: AuthService) {
    this.currentRoute = this.router.url;
    this.platform = this.router.url;
  }

  cliquer(section: string) {
    this.clique = section;
    this.newItemEvent.emit(this.clique);
    this.currentRoute = this.router.url;

    if (this.authService.isLoggedIn()) {
      if (section == "calcul" || section == "result") {
        if (this.platform == "/eks" || this.platform == "/eks-calculator") {
          const navigationExtras: NavigationExtras = {
            /*queryParams: {
              coursContent: JSON.stringify(this.coursContent)
            }*/
            state : {
              content: section
            }
          };
          if (this.currentRoute != '/eks') {
            this.router.navigate(['/eks'] , navigationExtras);
            this.clique = section;
          } else {
            this.router.navigate(['/eks-calculator'] , navigationExtras);
          }
        }
        if (this.platform == "/aks" || this.platform == "/aks-calculator") {
          const navigationExtras: NavigationExtras = {
            /*queryParams: {
              coursContent: JSON.stringify(this.coursContent)
            }*/
            state : {
              content: section
            }
          };

          if (this.currentRoute != '/aks') {
            this.router.navigate(['/aks'] , navigationExtras);
            this.clique = section;
          } else {
            this.router.navigate(['/aks-calculator'] , navigationExtras);
          }
        }
        if (this.platform == "/" || this.platform == "/comparaison") {
          const navigationExtras: NavigationExtras = {
            /*queryParams: {
              coursContent: JSON.stringify(this.coursContent)
            }*/
            state : {
              content: section
            }
          };
          this.router.navigate(['/eks'] , navigationExtras);
        }
      }
    } else {
      this.router.navigate(['/restreint']);
    }
  }

}
