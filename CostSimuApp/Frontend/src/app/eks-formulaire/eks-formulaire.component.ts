import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { CalculService } from '../services/calcul.service';

@Component({
  selector: 'app-eks-formulaire',
  templateUrl: './eks-formulaire.component.html',
  styleUrl: './eks-formulaire.component.scss'
})
export class EksFormulaireComponent implements OnInit{

  currentPath :any;
  calculatedSevices !: any[];
  services !: any[];

  constructor(private router : Router,
              private calculService: CalculService) {}

  ngOnInit(): void {
    this.currentPath = this.router.url;
    this.calculatedSevices = [];
    this.services = [
      {
        name: "Eks Cluster Pricing",
        desc: "Per month",
        price : 0.00,
        prop : [{field: "number of eks cluster", type: 'text', value: ""}],
        bool: false
      },
      {
        name: "EC2 specifications",
        desc: "Per month",
        price : 0.00,
        prop : [{field: "Tenancy", type: 'dropdown', choices:["Shared", "Dedicated"], value: ""},
                {field: "Operation System", type: 'dropdown', choices:["linux", "windows"], value: ""},
                {field: "Workloads", type: "radio", choices: ["Constant usage", "Daily spike traffic", "Weekly spike traffic", "Monthly spike traffic"], value: ""},
                {field: "Number of instances", type: "text", value: ""}],
        bool: false
      }
    ];
  }

  toggleSection(service : any) {
    for (let s of this.services) {
      if (s == service) {
        s.bool = !s.bool;
      }
    }
  }

  ShowModule(title: any) : boolean{
    for (let s of this.services) {
      if (s.name == title) {
        return s.bool;
      }
    }
    return false;
  }

  /*existIn(service: any, services: any) : boolean{
    for (let s of services) {
      if (s.name == service.name) {
        return true;
      }
    }
    return false;
  }*/

  removeService(service: any) {
    const i = this.calculatedSevices.indexOf(service);
    if (i >= 0 && i < this.calculatedSevices.length) {
      // Remove the service at the specified index
      this.calculatedSevices.splice(i, 1);
    }
    this.changeBoolOfService(service, true);
  }

  changeBoolOfService(service: any, value: boolean) {
    for (let s of this.services) {
      if (s.name == service.name) {
        s.bool = value;
      }
    }
  }

  changePriceOfService(serviceName: string, price: any) {
    let serv = this.services.filter((s) => {return s.name === serviceName})[0];
    serv.price = Number(price);
  }

  onSubmit(form: NgForm, service: any) {

    var prop : any[] = [];

    prop = service.prop.map((item: any) => {
      return {
        field: item.field,
        value: item.value
      };
    });

    this.calculService.calculer(service.name, JSON.stringify(prop)).subscribe((response) => {
      service.price = response;
      if (!this.calculatedSevices.includes(service)) {
        this.calculatedSevices.push(service);
      } else {
        for (let s of this.calculatedSevices) {
          if (s.name == service.name) {
            s.price = response;
          }
        }
      }
    }

    );

    this.changeBoolOfService(service, false);
  }

}
