import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-eks-formulaire',
  templateUrl: './eks-formulaire.component.html',
  styleUrl: './eks-formulaire.component.scss'
})
export class EksFormulaireComponent implements OnInit{

  currentPath :any;
  calculatedSevices !: any[];

  constructor(private router : Router) {}

  ngOnInit(): void {
    this.currentPath = this.router.url;
    this.calculatedSevices = [
      {
        name: "service name",
        desc: "description",
        price : 10
      },
      {
        name: "service name",
        desc: "description",
        price : 10
      },
      {
        name: "service name",
        desc: "description",
        price : 10
      }
    ];
  }

  onSubmit(form: NgForm) {
    const navigationExtras: NavigationExtras = {
      state : {
        content: 'result'
      }
    }
    if (this.currentPath == '/eks') {
      this.router.navigate(['/eks-calculator'], navigationExtras);
    } else if ( this.currentPath == '/eks-calculator') {
      this.router.navigate(['/eks'], navigationExtras);
    }
  }

}
