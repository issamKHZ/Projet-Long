import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-affichage',
  templateUrl: './comp-affichage.component.html',
  styleUrl: './comp-affichage.component.scss'
})
export class CompAffichageComponent implements OnInit{
  aksFacture !: any;
  eksFacture !: any;
  eksFactureExist !: boolean;
  aksFactureExist !: boolean;


  constructor(private route : Router) {}

  ngOnInit(): void {
    const eksFacture = localStorage.getItem("eksFacture");
    this.eksFactureExist = eksFacture !== null;
    this.eksFacture = this.eksFactureExist ? JSON.parse(eksFacture!) : null;

    const aksFacture = localStorage.getItem("aksFacture");
    this.aksFactureExist = aksFacture !== null;
    this.aksFacture = this.aksFactureExist ? JSON.parse(aksFacture!) : null;

  }

  goToCalcul(serv : string) {
    const navigationExtras: NavigationExtras = {
      state : {
        content: "calcul"
      }
    };
    if (serv == 'eks') {
      this.route.navigate(['/eks'], navigationExtras);
    } else {
      this.route.navigate(['/aks'], navigationExtras);
    }
  }
}
