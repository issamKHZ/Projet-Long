import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-aks-result',
  templateUrl: './aks-result.component.html',
  styleUrl: './aks-result.component.scss'
})
export class AksResultComponent {
  servicesApaye : any[] = [];
  appName : string = "Aks Results";
  totalPrice : any;
  platform !: string;
  @Input() receviedData : any;

  constructor(private router: Router) {
    this.platform = router.url;
  }

  ngOnInit(): void {
    const aksFacture = localStorage.getItem("aksFacture");
    this.receviedData = aksFacture !== null ? JSON.parse(aksFacture!) : null;
    this.servicesApaye = this.receviedData.props;
    this.totalPrice = this.receviedData.price;
  }

  goToCalcul() {
    const navigationExtras: NavigationExtras = {
      /*queryParams: {
        coursContent: JSON.stringify(this.coursContent)
      }*/
      state : {
        content: "calcul"
      }
    };
    if (this.platform == "/aks") {
      this.router.navigate(['/aks-calculator'] , navigationExtras);
    } else {
      this.router.navigate(['/aks'] , navigationExtras);
    }
  }

  retourEks() {
    const navigationExtras: NavigationExtras = {
      state : {
        content: "calcul"
      }
    };
    this.router.navigate(['/eks'] , navigationExtras);
  }

  delete() {
    const navigationExtras: NavigationExtras = {
      state : {
        content: "result"
      }
    };
    localStorage.removeItem('aksFacture');
    if (this.platform == '/aks') {
      this.router.navigate(['/aks-calculator'], navigationExtras);
    } else {
      this.router.navigate(['/aks'], navigationExtras);
    }
  }
}
