import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class globalService {

  constructor(private router: Router) {}

  services : any[] = [
    {
      name: "Eks Cluster Pricing",
      desc: "Per month",
      price: 0.00,
      prop: [
        { field: "number of eks cluster", family: "EKS Cluster Pricing", type: 'text', value: "", placeholder: "Enter value..." }
      ],
      families: ["EKS Cluster Pricing"],
      bool: false
    },
    {
      name: "Amazon EC2",
      desc: "Per month",
      price: 0.00,
      prop: [
        { field: "Tenancy", family: "EC2 specifications", type: 'dropdown', choices: ["Shared", "Dedicated"], value: "" },
        { field: "Operation System", family: "EC2 specifications", type: 'dropdown', choices: ["linux", "windows"], value: "" },
        { field: "Workloads", family: "EC2 specifications", type: "radio", choices: ["Constant usage", "Daily spike traffic", "Weekly spike traffic", "Monthly spike traffic"], value: "" },
        { field: "Number of instances", family: "EC2 specifications", type: "text", value: "", placeholder: "Enter value..." }
      ],
      families: ["EC2 specifications"],
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

  redirectTo(path: string) {
    this.router.navigate(['/']);
  }

}
