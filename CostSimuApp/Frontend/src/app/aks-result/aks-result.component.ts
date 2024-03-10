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
    const aksFacture = localStorage.getItem("aksFacture");
    this.receviedData = aksFacture !== null ? JSON.parse(aksFacture!) : null;
    if (this.receviedData != null) {
      this.servicesApaye = this.receviedData.props;
      this.totalPrice = this.receviedData.price;
    }
    const aksload = localStorage.getItem("load-aks");
    this.load = aksload !== null ? JSON.parse(aksload!) : null;

    const aksperf = localStorage.getItem("perf-aks");
    this.performanceMetrics = aksperf !== null ? JSON.parse(aksperf!) : this.fPerformanceMetrics;

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
    localStorage.setItem("perf-aks", JSON.stringify(this.performanceMetrics));
  }
}
