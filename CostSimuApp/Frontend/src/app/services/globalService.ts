import { CalculService } from './calcul.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class globalService {

  constructor(private router: Router, private calculService: CalculService) {}

  data !: {props: any[], price: any};
  services : any[] = [
    {
      name: "Eks Cluster Pricing",
      desc: "Per month",
      price: 0.00,
      prop: [
        { field: "number of eks cluster", family: "EKS Cluster Pricing", type: 'number', value: "", placeholder: "Enter value..." }
      ],
      families: ["EKS Cluster Pricing"],
      bool: false
    },
    {
      name: "Amazon EC2",
      desc: "Per month",
      price: 0.00,
      prop: [
        { field: "Operation System", family: "EC2 specifications", type: 'dropdown', choices: ["linux", "windows"], value: "linux" },
        { field: "Workloads", family: "EC2 specifications", type: "radio", choices: ["Constant usage"], value: "Constant usage" },
        { field: "Number of instances", family: "EC2 specifications", type: "text", value: "1", placeholder: "Enter value..." },
        { field: "Instance family", family: "EC2 Instances", type: 'dropdown', choices: ["m7g", "m7j", "m7a", "mac", "m6g", "m6i", "m6in", "m6a", "m5", "m5zn", "m5a", "m4", "t4g", "t3", "t3a", "t2"], value: "t4g" },
        { field: "vCPUs", family: "EC2 Instances", type: 'dropdown', choices: [1, 2, 4, 8, 12, 16, 24, 32, 36, 40, 48, 64, 72, 96, 128, 192, 224, 448], value: "2" },
        { field: "Memory (GiB)", family: "EC2 Instances", type: 'dropdown', choices: ["0.5 GiB","1 GiB", "2 GiB", "3.75 GiB", "4 GiB", "5.25 GiB", "6 GiB", "7.5 GiB", "8 GiB", "10.5 GiB", "15.25 GiB", "15 GiB", "16 GiB"], value: "4 GiB" },
        { field: "Network performance", family: "EC2 Instances", type: 'dropdown', choices: ["Up to 5 Gigabit","Low", "Low to Moderate", "Up to 12500 Megabit", "Up to 25000 Megabit", "Up to 30 Gigabit", "Up to 30000 Megabit", "Up to 40 Gigabit", "Up to 15 Gigabit", "Up to 40000 Megabit", "Up to 50 Gigabit"], value: "Up to 5 Gigabit" },
        { field: "Usage (days)", family: "On-demand Pricing", type: 'text', value: "22" },
        { field: "Usage type", family: "On-demand Pricing", type: 'dropdown', choices: ["hours / day", "hours / week", "hours / month"], value: "hours / day" },
      ],
      families: ["EC2 specifications", "EC2 Instances", "On-demand Pricing"],
      bool: false
    },
    {
      name: "Amazon Managed Service for Prometheus",
      desc: "Per month",
      price: 0.0,
      prop: [
        { field: "Select Metric", family: "Metric sample ingestionn", type: "dropdown", choices: ["Active Series", "Ingestion Rate"], value: "Active Series" },
        { field: "Retention Period (in days)", family: "Storage", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Average Number of Dashboard users per day", family: "Query Samples Processed (Monitoring)", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Number of Prometheus rules", family: "Query Samples Processed (Alerting and Recording Rules)", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Average rule execution interval (in seconds)", family: "Query Samples Processed (Alerting and Recording Rules)", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Average number of queries per day per dashboard user", family: "Query Samples Processed (Advanced Settings - Optional)", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Average samples per query for Monitoring queries", family: "Query Samples Processed (Advanced Settings - Optional)", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Average samples per query for Alerting queries", family: "Query Samples Processed (Advanced Settings - Optional)", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Number of collectors", family: "Managed Collector", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Number of Samples collected", family: "Managed Collector", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Unit", family: "Managed Collector", type: "dropdown", choices: ["Per second", "Per month"], value: "" },
      ],
      families: ["Metric sample ingestionn", "Storage", "Query Samples Processed (Monitoring)", "Query Samples Processed (Alerting and Recording Rules)", "Query Samples Processed (Advanced Settings - Optional)", "Managed Collector"],
      bool: false
    },
    {
      name: "VPN Connection feature",
      desc: "Per month",
      price: 0.0,
      prop: [
        { field: "Number of Site-to-Site VPN Connections", family: "Site-to-Site VPN settings", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Average duration for each connection", family: "Site-to-Site VPN settings", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Unit", family: "Site-to-Site VPN settings", type: "dropdown", choices: ["hours per day", "hours per week", "hours per month"], value: "" },
        { field: "Number of subnet associations", family: "Client VPN settings", type: "text", value: "", placeholder: "Number of subnets associated to an AWS Client VPN endpoint..." },
        { field: "Value (per day)", family: "Number of active Client VPN connections (or users)", type: "text", value: "", placeholder: "Connection limitations apply based on the number of subnet associations..." },
        { field: "Average duration for each connection (hours per day)", family: "Number of active Client VPN connections (or users)", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Working days per month", family: "Number of active Client VPN connections (or users)", type: "text", value: "", placeholder: "Enter value > 21" },
      ],
      families: ["Site-to-Site VPN settings", "Client VPN settings", "Number of active Client VPN connections (or users)"],
      bool: false
    },
    {
      name: "Elastic Load Balancing",
      desc: "Per month",
      price: 0.0,
      prop: [
        { field: "Number of Application Load Balancers", family: "Service settings", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Value1", family: "Processed bytes (Lambda functions as targets)", type: "text", value: "", placeholder: "Enter value..." },
        { field: "unit1", family: "Processed bytes (Lambda functions as targets)", type: "dropdown", choices: ["GB per hour", "GB per month", "TB per hour", "TB per month"], value: "" },
        { field: "Value2", family: "Processed bytes (EC2 Instances and IP addresses as targets)", type: "text", value: "", placeholder: "Enter value..." },
        { field: "unit2", family: "Processed bytes (EC2 Instances and IP addresses as targets)", type: "dropdown", choices: ["GB per hour", "GB per month", "TB per hour", "TB per month"], value: "" },
        { field: "Value3", family: "Average number of new connections per ALB", type: "text", value: "", placeholder: "Enter value..." },
        { field: "unit3", family: "Average number of new connections per ALB", type: "dropdown", choices: ["per second", "per minute"], value: "" },
        { field: "Value4", family: "Average connection duration", type: "text", value: "", placeholder: "Enter value..." },
        { field: "unit4", family: "Average connection duration", type: "dropdown", choices: ["second", "minute"], value: "" },
        { field: "Average number of requests per second per ALB", family: "Load Balancer Capacity", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Average number of rule evaluations per request", family: "Load Balancer Capacity", type: "text", value: "", placeholder: "Enter value..." },
      ],
      families: ["Service settings", "Processed bytes (Lambda functions as targets)", "Processed bytes (EC2 Instances and IP addresses as targets)", "Average number of new connections per ALB", "Average connection duration", "Load Balancer Capacity"],
      bool: false
    },
    {
      name: "AWS Key Management Service",
      desc: "Per month",
      price: 0.0,
      prop: [
        { field: "Number of customer managed Customer Master Keys (CMK)", family: "Service settings", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Number of symmetric requests", family: "Service settings", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Number of asymmetric requests except RSA 2048", family: "Service settings", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Number of asymmetric requests involving RSA 2048", family: "Service settings", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Number of ECC GenerateDataKeyPair requests", family: "Service settings", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Number of RSA GenerateDataKeyPair requests", family: "Service settings", type: "text", value: "", placeholder: "Enter value..." },
      ],
      families: ["Service settings"],
      bool: false
    },
    {
      name: "Amazon CloudWatch",
      desc: "Per month",
      price: 0.0,
      prop: [
        { field: "Number of Metrics (includes detailed and custom metrics)", family: "Metrics", type: "text", value: "", placeholder: "Enter value..." },
        { field: "GetMetricData: Number of metrics requested", family: "APIs", type: "text", value: "", placeholder: "Enter value..." },
        { field: "GetMetricWidgetImage: Number of metrics requested", family: "APIs", type: "text", value: "", placeholder: "Enter value..." },
        { field: "Number of other API requests", family: "APIs", type: "text", value: "", placeholder: "GetMetricStatistics, ListMetrics, PutMetricData, GetDashboard, etc..." },
      ],
      families: ["Metrics", "APIs"],
      bool: false
    }
  ];

  transfert(service: string, calcul : any [], price : any) {
    var data : {props: any[], price : any} = {props: [], price: 0};

    data.props = calcul.map((item) => {return {
      name: item.name,
      value: item.price
      };
    });
    data.price = price;
    const navigationExtras: NavigationExtras = {
      state : {
        content: "result",
        calcul: data
      }
    };
    if (service == "eks") {
      localStorage.setItem("eksFacture", JSON.stringify(data));
      this.calculService.stockEKS(data);
      if (this.router.url == "/eks") {
        this.router.navigate(['/eks-calculator'] , navigationExtras);
      } else {
        this.router.navigate(['/eks'] , navigationExtras);
      }
    }
    if (service == "aks") {
      localStorage.setItem("aksFacture", JSON.stringify(data));
      this.calculService.stockAKS(data);
      if (this.router.url == "/aks") {
        this.router.navigate(['/aks-calculator'] , navigationExtras);
      } else {
        this.router.navigate(['/aks'] , navigationExtras);
      }
    }
  }

  redirectTo(path: string) {
    this.router.navigate(['/']);
  }

}
