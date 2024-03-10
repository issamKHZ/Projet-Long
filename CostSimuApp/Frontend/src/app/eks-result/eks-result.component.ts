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
  load: any;
  performanceMetrics: any;

  fPerformanceMetrics: any =
    {
      theads: [],
      lignes: [{
                fam: "Availability and Reliability",
                n: 2,
                metrics: "Uptime",
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                metrics: "Error Rate",
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                fam: "Scalability",
                n: 1,
                metrics: "Throughput",
                low: "",
                medium: "",
                high: "",
                very: ""
               },
               {
                fam: "Latency and Response Time",
                n: 2,
                metrics: "Response Time",
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
                n: 3,
                metrics: "CPU Utilization",
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
                low: "",
                medium: "",
                high: "",
                very: ""
               },
    ]
    }
  ;



  constructor(private router: Router) {
    this.platform = router.url;
  }

  ngOnInit(): void {
    const eksFacture = localStorage.getItem("eksFacture");
    this.receviedData = eksFacture !== null ? JSON.parse(eksFacture!) : null;
    if (this.receviedData != null) {
      this.servicesApaye = this.receviedData.props;
      this.totalPrice = this.receviedData.price;
    }
    const eksload = localStorage.getItem("load-eks");
    this.load = eksload !== null ? JSON.parse(eksload!) : null;

    const eksperf = localStorage.getItem("perf-eks");
    this.performanceMetrics = eksperf !== null ? JSON.parse(eksperf!) : this.fPerformanceMetrics;
    this.rectifyTab();
  }

  isKeyIn(value: any, key: string): boolean {
    return typeof value === 'object' && value !== null && key in value;
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && 'fam' in value && 'n' in value;
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
  rectifyTab() {
    var key : string;
    if (this.load != null) {
      switch (this.load.name) {
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
      if (!this.performanceMetrics.theads.includes(this.load.name)) {
        this.performanceMetrics.theads.push(this.load.name);
        this.sort();
      }
      for (let l of this.performanceMetrics.lignes) {
        l[key] = this.load.props.find((p: any) => p.field === l.metrics)?.value || "";
      }
      localStorage.setItem("perf-eks", JSON.stringify(this.performanceMetrics));
    }
  }
}
