import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-eks-performance',
  templateUrl: './eks-performance.component.html',
  styleUrl: './eks-performance.component.scss'
})
export class EksPerformanceComponent {

  currentPath :any;
  verification: boolean = false;
  expand: string = "Expand all";

  Loads = [
    {
      name: "Low Load (<~ 500)",
      props: [
        {field: "Uptime", type: "text", value:"", family: "Availability and Reliability", placeholder:"Unit is (%)"},
        {field: "Error Rate", type: "text", value:"", family: "Availability and Reliability", placeholder:"Unit is (%)"},
        {field: "Throughput", type: "text", value:"", family: "Scalability", placeholder:"Unit is (requeste/second)"},
        {field: "Response Time", type: "text", value:"", family: "Latency and Response Time", placeholder:"Unit is (second)"},
        {field: "Latency", type: "text", value:"", family: "Latency and Response Time", placeholder:"Unit is (second)"},
        {field: "CPU Utilization", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (%)"},
        {field: "memory usage", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (%)"},
        {field: "Storage Throughput", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (kB/second)"}
      ],
      families: ["Availability and Reliability", "Scalability", "Latency and Response Time", "Resource Utilization Efficiency"],
      bool: false
    },
    {
      name: "Medium Load (<~ 1000)",
      props: [
        {field: "Uptime", type: "text", value:"", family: "Availability and Reliability", placeholder:"Unit is (%)"},
        {field: "Error Rate", type: "text", value:"", family: "Availability and Reliability", placeholder:"Unit is (%)"},
        {field: "Throughput", type: "text", value:"", family: "Scalability", placeholder:"Unit is (requeste/second)"},
        {field: "Response Time", type: "text", value:"", family: "Latency and Response Time", placeholder:"Unit is (second)"},
        {field: "Latency", type: "text", value:"", family: "Latency and Response Time", placeholder:"Unit is (second)"},
        {field: "CPU Utilization", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (%)"},
        {field: "memory usage", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (%)"},
        {field: "Storage Throughput", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (kB/second)"}
      ],
      families: ["Availability and Reliability", "Scalability", "Latency and Response Time", "Resource Utilization Efficiency"],
      bool: false
    },
    {
      name: "High Load (<~ 1500)",
      props: [
        {field: "Uptime", type: "text", value:"", family: "Availability and Reliability", placeholder:"Unit is (%)"},
        {field: "Error Rate", type: "text", value:"", family: "Availability and Reliability", placeholder:"Unit is (%)"},
        {field: "Throughput", type: "text", value:"", family: "Scalability", placeholder:"Unit is (requeste/second)"},
        {field: "Response Time", type: "text", value:"", family: "Latency and Response Time", placeholder:"Unit is (second)"},
        {field: "Latency", type: "text", value:"", family: "Latency and Response Time", placeholder:"Unit is (second)"},
        {field: "CPU Utilization", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (%)"},
        {field: "memory usage", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (%)"},
        {field: "Storage Throughput", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (kB/second)"}
      ],
      families: ["Availability and Reliability", "Scalability", "Latency and Response Time", "Resource Utilization Efficiency"],
      bool: false
    },
    {
      name: "Very High Load (<~ 2000)",
      props: [
        {field: "Uptime", type: "text", value:"", family: "Availability and Reliability", placeholder:"Unit is (%)"},
        {field: "Error Rate", type: "text", value:"", family: "Availability and Reliability", placeholder:"Unit is (%)"},
        {field: "Throughput", type: "text", value:"", family: "Scalability", placeholder:"Unit is (requeste/second)"},
        {field: "Response Time", type: "text", value:"", family: "Latency and Response Time", placeholder:"Unit is (second)"},
        {field: "Latency", type: "text", value:"", family: "Latency and Response Time", placeholder:"Unit is (second)"},
        {field: "CPU Utilization", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (%)"},
        {field: "memory usage", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (%)"},
        {field: "Storage Throughput", type: "text", value:"", family: "Resource Utilization Efficiency", placeholder:"Unit is (kB/second)"}
      ],
      families: ["Availability and Reliability", "Scalability", "Latency and Response Time", "Resource Utilization Efficiency"],
      bool: false
    }

  ]

  constructor(private router: Router) {}

  toggleSection(service : any) {
    let i = 0;
    for (let s of this.Loads) {
      if (s == service) {
        s.bool = !s.bool;
      }
    }
    for (let s of this.Loads) {
      if (!s.bool) {
        i = i + 1;
      }
    }
    if (i == this.Loads.length) {
      this.expand = "Expand all";
    } else {
      this.expand = "Collapse all";
    }
  }

  ShowModule(title: any) : boolean{
    for (let s of this.Loads) {
      if (s.name == title) {
        return s.bool;
      }
    }
    return false;
  }

  toggle() {
    if (this.expand == "Expand all") {
      for (let s of this.Loads) {
        s.bool = true;
      }
      this.expand = "Collapse all";
    } else {
      for (let s of this.Loads) {
        s.bool = false;
      }
      this.expand = 'Expand all';
    }
  }

  onSubmit(form: NgForm, load: any) {
    localStorage.setItem("load-eks", JSON.stringify(load));
    const navigationExtras: NavigationExtras = {
      state : {
        content: "result",
        load: load
      }
    };

    if (this.router.url == "/eks") {
      this.router.navigate(['/eks-calculator'] , navigationExtras);
    } else {
      this.router.navigate(['/eks'] , navigationExtras);
    }

  }
}
