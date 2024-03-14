import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, numberAttribute } from '@angular/core';

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
  performanceMetrics: any;
  eksLoad: any;
  aksLoad: any;

  fPerformanceMetrics: any =
    {
      theads: [],
      lignes: [{
                fam: "Availability and Reliability",
                n: 4,
                metrics: "Uptime",
                m: 2,
                low: "100%",
                medium: "100%",
                high: "",
                very: ""
               },
               {
                metrics: "Uptime",
                low: "50%",
                medium: "50%",
                high: "",
                very: ""
               },
               {
                metrics: "Error Rate",
                m: 2,
                low: "0%",
                medium: "0%",
                high: "",
                very: ""
               },
               {
                metrics: "Error Rate",
                low: "0%",
                medium: "0%",
                high: "",
                very: ""
               },
               {
                fam: "Scalability",
                n: 2,
                metrics: "Throughput",
                m: 2,
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                metrics: "Throughput",
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                fam: "Latency and Response Time",
                n: 4,
                metrics: "Response Time",
                m: 2,
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                metrics: "Response Time",
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                metrics: "Latency",
                m: 2,
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                metrics: "Latency",
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                fam: "Resource Utilization Efficiency",
                n: 6,
                metrics: "CPU Utilization",
                m: 2,
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                metrics: "CPU Utilization",
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                metrics: "memory usage",
                m: 2,
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                metrics: "memory usage",
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                metrics: "Storage Throughput",
                m:2,
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                metrics: "Storage Throughput",
                low: "",
                medium: "",
                high: "",
                very: ""
               }
    ]
    }
  ;


  constructor(private route : Router) {}

  ngOnInit(): void {
    const eksFacture = localStorage.getItem("eksFacture");
    this.eksFactureExist = eksFacture !== null;
    this.eksFacture = this.eksFactureExist ? JSON.parse(eksFacture!) : null;

    const aksFacture = localStorage.getItem("aksFacture");
    this.aksFactureExist = aksFacture !== null;
    this.aksFacture = this.aksFactureExist ? JSON.parse(aksFacture!) : null;

    const eksload = localStorage.getItem("load-eks");
    this.eksLoad = eksload !== null ? JSON.parse(eksload!) : null;

    const aksload = localStorage.getItem("load-aks");
    this.aksLoad = aksload !== null ? JSON.parse(aksload!) : null;
    console.log("aksload is  : ", aksload);

    const ekscomp = localStorage.getItem("perf-comp");
    this.performanceMetrics = ekscomp !== null ? JSON.parse(ekscomp!) : this.fPerformanceMetrics;

    this.rectifyTab();

  }

  isKeyIn(value: any, key: string): boolean {
    return typeof value === 'object' && value !== null && key in value;
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && 'fam' in value && 'n' in value;
  }

  deleteThead(thead: string) {
    const index = this.performanceMetrics.theads.indexOf(thead);
    const x = this.performanceMetrics.theads.splice(index, 1);
  }

  includes(param: string) : boolean {
    switch (param) {
      case 'low':
        return this.performanceMetrics.theads.includes('Low Load (<~ 500)');
      case 'medium':
        return this.performanceMetrics.theads.includes('Medium Load (<~ 1000)');
      case 'high':
        return this.performanceMetrics.theads.includes('High Load (<~ 1500)');
      case 'very':
        return this.performanceMetrics.theads.includes('Very High Load (<~ 2000)');
      default:
        return false;
    }
  }

  sort() {
    var newTheads : any = [];
    if (this.performanceMetrics.theads.includes('Low Load (<~ 500)')) {
      newTheads.push('Low Load (<~ 500)');
    }
    if (this.performanceMetrics.theads.includes('Medium Load (<~ 1000)')) {
      newTheads.push('Medium Load (<~ 1000)');
    }
    if (this.performanceMetrics.theads.includes('High Load (<~ 1500)')) {
      newTheads.push('High Load (<~ 1500)');
    }
    if (this.performanceMetrics.theads.includes('Very High Load (<~ 2000)')) {
      newTheads.push('Very High Load (<~ 2000)');
    }
    this.performanceMetrics.theads = newTheads;
  }

  percentageToNumber(percentageString: string): number {
    // Vérifier si la chaîne se termine par "%"

      // Supprimer le caractère "%" et convertir la chaîne en nombre
    const percentageValue = parseFloat(percentageString);

      // Vérifier si la conversion est réussie
    return percentageValue;


  }

  dataOfHisto(load :string) : any[] {
    var dataEks : number[] = [];
    var dataAks : number[] = [];
    var i = 0;
    for (let l of this.performanceMetrics.lignes) {
      if (i % 2 == 0) {
        dataEks.push(this.percentageToNumber(l[load]));
        i = i + 1;
      } else {
        dataAks.push(this.percentageToNumber(l[load]));
        i = i + 1;
      }
    }

    return [dataEks, dataAks];
  }

  dataOfHistoEks(load: string) : number[]{
    console.log("enter in dataOfHistoEks");
    let data = this.dataOfHisto(load);
    console.log(data[0]);
    return data[0];
  }

  dataOfHistoAks(load: string) : number[]{
    console.log("enter in dataOfHistoAks");
    let data = this.dataOfHisto(load);
    return data[1];
  }

  theadToAttr(thead: string) : string{
    var key : string;
    switch (thead) {
      case 'Low Load (<~ 500)':
        key = "low";
        break;
      case 'Medium Load (<~ 1000)':
        key = "medium";
        break;
      case 'High Load (<~ 1500)':
        key = "high";
        break;
      case 'Very High Load (<~ 2000)':
        key = "very";
        break;
      default:
        key = "";
    }
    return key;

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

  rectifyTab() {
    var key : string;
    if (this.eksLoad != null && this.aksLoad != null) {
      switch (this.eksLoad.name) {
        case 'Low Load (<~ 500)':
          key = "low";
          break;
        case 'Medium Load (<~ 1000)':
          key = "medium";
          break;
        case 'High Load (<~ 1500)':
          key = "high";
          break;
        case 'Very High Load (<~ 2000)':
          key = "very";
          break;
        default:
          key = "";
      }

      if (!this.performanceMetrics.theads.includes(this.eksLoad.name)) {
        this.performanceMetrics.theads.push(this.eksLoad.name);
        this.sort();
      }
      var i = 0;
      for (let l of this.performanceMetrics.lignes) {
        if (i % 2 == 0) {
          l[key] = this.eksLoad.props.find((p: any) => p.field === l.metrics)?.value || "";
        } else if (i % 2 == 1) {
          l[key] = this.aksLoad.props.find((p: any) => p.field === l.metrics)?.value || "";
        }
        i = i + 1;
      }
      localStorage.setItem("perf-comp", JSON.stringify(this.performanceMetrics));
    }
  }
}
