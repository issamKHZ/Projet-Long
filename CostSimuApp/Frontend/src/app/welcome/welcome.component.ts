import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  constructor(private router: Router) {}

  choise(clique: string) {
    if (clique == 'eks') {
      const navigationExtras: NavigationExtras = {
        /*queryParams: {
          coursContent: JSON.stringify(this.coursContent)
        }*/
        state : {
          content: "calcul"
        }
      };
      this.router.navigate(['/eks'] , navigationExtras);
    }
    if (clique == 'aks') {
      const navigationExtras: NavigationExtras = {
        /*queryParams: {
          coursContent: JSON.stringify(this.coursContent)
        }*/
        state : {
          content: "calcul"
        }
      };
      this.router.navigate(['/aks'] , navigationExtras);
    }
  }
}
