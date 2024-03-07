import { globalService } from './../services/globalService';
import { AuthService } from './../services/auth.service';
import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CalculService } from '../services/calcul.service';
import { PreCalculService } from '../services/pre-calcul.service';

interface InstanceOption {
  value: string;
  label: string;
}


@Component({
  selector: 'app-aks-formulaire',
  templateUrl: './aks-formulaire.component.html',
  styleUrl: './aks-formulaire.component.scss'
})

export class AksFormulaireComponent implements OnInit{
  currentPath :any;
  calculatedSevices !: any[];
  services !: any[];
  verification: boolean = false;
  totalPrice : any;
  expand: string = "Expand all";

  //dehbi
  numClusters = 1;
  osType = 'linux';
  instanceType = 'D2s V3';
  numVMs = 1;
  numHours = 1;
  managedDiskTier = 'Standard SSD';
  diskSize = 4;
  numDisks = 1;

  instanceOptions: InstanceOption[] = [
    { value: 'D2s V3', label: 'D2s V3: 2 vCPUs, 8 Go de RAM, 16 Go de stockage temporaire, $0.117/hour' },
    { value: "D4s V3", label: "D4s V3: 4 vCPUs, 16 Go de RAM, 32 Go de stockage temporaire, $0.234/hour" },
        { value: "D8S V3", label: "D8S V3: 8 vCPUs, 32 Go de RAM, 64 Go de stockage temporaire, $0.468/hour" },
        { value: "D165 v3", label: "D165 v3: 16 vCPUs, 64 Go de RAM, 128 Go de stockage temporaire, $0.936/hour" },
        { value: "D32s v3", label: "D32s v3: 32 vCPUs, 128 Go de RAM, 256 Go de stockage temporaire, $1.872/hour" },
        { value: "D485 v3", label: "D485 v3: 48 vCPUs, 192 Go de RAM, 384 Go de stockage temporaire, $3.744/hour" },
        { value: "D64s v3", label: "D64s v3: 64 vCPUs, 256 Go de RAM, 512 Go de stockage temporaire, $2.808/hour" }
  ];
  managedDiskTiers = ['Standard SSD', 'Standard HDD', 'Premium SSD'];
  diskSizes = [4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32767];

  constructor(private router : Router,
    private calculService: CalculService,
    private globalService : globalService) {}

  ngOnInit(): void {
    this.currentPath = this.router.url;
    this.calculatedSevices = [];
    this.expand = "Expand all";
    this.services = [];

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

  somme() {
    let somme = 0.0;
    for (let  calcServ of this.calculatedSevices) {
      somme = somme + calcServ.price;
    }
    this.totalPrice = somme;
  }

  goToCheckout() {
    //this.globalService.transfert(this.calculatedSevices, this.totalPrice);
  }

  onSubmit() {
    const data = {numClusters: this.numClusters,
      osType: this.osType,
      instanceType: this.instanceType,
      numVMs: this.numVMs,
      numHours: this.numHours,
      managedDiskTier: this.managedDiskTier,
      diskSize: this.diskSize,
      numDisks: this.numDisks
    };
    this.calculService.calculerAKS(data).subscribe((response) => {
      this.totalPrice = response;
      this.calculatedSevices = [{name: "Azure kubernetes service (aks)", price: response}, ]
      this.globalService.transfert("aks", this.calculatedSevices, this.totalPrice);
    })
  }
}
