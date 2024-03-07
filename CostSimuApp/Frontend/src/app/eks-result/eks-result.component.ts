import { globalService } from './../services/globalService';
import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-eks-result',
  templateUrl: './eks-result.component.html',
  styleUrl: './eks-result.component.scss'
})
export class EksResultComponent implements OnInit{

  servicesApaye : any[] = [];
  appName : string = "Eks Results";
  totalPrice : any;
  platform !: string;
  @Input() receviedData : any;

  constructor(private router: Router) {
    this.platform = router.url;
  }

  ngOnInit(): void {
    const eksFacture = localStorage.getItem("eksFacture");
    this.receviedData = eksFacture !== null ? JSON.parse(eksFacture!) : null;
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
    if (this.platform == "/eks") {
      this.router.navigate(['/eks-calculator'] , navigationExtras);
    } else {
      this.router.navigate(['/eks'] , navigationExtras);
    }
  }

  retourAks() {
    const navigationExtras: NavigationExtras = {
      state : {
        content: "calcul"
      }
    };
    this.router.navigate(['/aks'] , navigationExtras);
  }

  delete() {
    const navigationExtras: NavigationExtras = {
      state : {
        content: "result"
      }
    };
    localStorage.removeItem('eksFacture');
    if (this.platform == '/eks') {
      this.router.navigate(['/eks-calculator'], navigationExtras);
    } else {
      this.router.navigate(['/eks'], navigationExtras);
    }
  }
}
