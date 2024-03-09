import { PreCalculService } from '../services/pre-calcul.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { CalculService } from '../services/calcul.service';
import { globalService } from '../services/globalService';

@Component({
  selector: 'app-eks-formulaire',
  templateUrl: './eks-formulaire.component.html',
  styleUrl: './eks-formulaire.component.scss'
})
export class EksFormulaireComponent implements OnInit{

  currentPath :any;
  calculatedSevices !: any[];
  services !: any[];
  verification: boolean = false;
  totalPrice : any;
  expand: string = "Expand all";
  prometheusAS : any[] = [{ field: "Average active time series", father: "Active Series", family: "Metric sample ingestionn", type: "text", value: "", placeholder: "Enter value..." },
  { field: "Avg Collection Interval (in seconds)", father: "Active Series", family: "Metric sample ingestionn", type: "text", value: "", placeholder: "Enter value..." },];
  prometheusIR : any[] = [{ field: "Ingestion Rate", father: "Ingestion Rate", family: "Metric sample ingestionn", type: "text", value: "", placeholder: "Enter value..." }];

  constructor(private router : Router,
              private calculService: CalculService,
              private preCalculService: PreCalculService,
              private globalService: globalService) {
              }

  ngOnInit(): void {
    this.currentPath = this.router.url;
    this.calculatedSevices = [];
    this.expand = "Expand all";
    this.services = this.globalService.services;

  }

  recupererData() {
    this.calculService.recuperEksStored().subscribe((response: any) => {
      var services = response.serviceApaye;
      var total = response.totalPrice;
      var keys = Object.keys(services);

      this.totalPrice = total;
      for (let k of keys) {
        this.calculatedSevices.push({name: k, desk: "per month", price: services[k]});
      }
    });

  }

  toggleSection(service : any) {
    let i = 0;
    for (let s of this.services) {
      if (s == service) {
        s.bool = !s.bool;
      }
    }
    for (let s of this.services) {
      if (!s.bool) {
        i = i + 1;
      }
    }
    if (i == this.services.length) {
      this.expand = "Expand all";
    } else {
      this.expand = "Collapse all";
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

  removeService(service: any) {
    const i = this.calculatedSevices.indexOf(service);
    if (i >= 0 && i < this.calculatedSevices.length) {
      // Remove the service at the specified index
      this.calculatedSevices.splice(i, 1);
    }
    this.somme();
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

  somme() {
    let somme = 0.0;
    for (let  calcServ of this.calculatedSevices) {
      somme = somme + calcServ.price;
    }
    this.totalPrice = somme;
  }

  toggle() {
    if (this.expand == "Expand all") {
      for (let s of this.services) {
        s.bool = true;
      }
      this.expand = "Collapse all";
    } else {
      for (let s of this.services) {
        s.bool = false;
      }
      this.expand = 'Expand all';
    }
  }

  goToCheckout() {
    this.globalService.transfert("eks", this.calculatedSevices, this.totalPrice);
  }

  onSubmit(form: NgForm, service: any) {

    var prop : any[] = [];
    var myService : any = Object.assign({}, service);
    if (form.valid) {

      if (service.name == "Amazon Managed Service for Prometheus") {
        let firstDropdown = service.prop.filter((item : any) => item.field === "Select Metric")[0];
        if (firstDropdown.value == "Active Series") {
          myService.prop = service.prop.concat(this.prometheusAS);
        } else {
          myService.prop = service.prop.concat(this.prometheusIR);
        }
        prop = this.preCalculService.preCalculPrometheus(myService);
      } else if (service.name == "Elastic Load Balancing") {
        prop = this.preCalculService.preCalculLB(myService);

      } else if (service.name == "VPN Connection feature") {
        prop = this.preCalculService.preCalculVPN(myService);
        console.log("prop envoyé : ", prop);
      } else {
        prop = this.preCalculService.PreCalculNormal(myService);
      }

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
        this.somme();
      }

      );
      this.changeBoolOfService(service, false);


    }
  }

}
