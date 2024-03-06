import { Injectable } from '@angular/core';
import { min } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreCalculService {

  constructor() { }

  PreCalculNormal(service: any) : {field: string, value: string}[] {
    let prop = service.prop.map((item: any) => {
      return {
        field: item.field,
        value: item.value
      };
    });
    return prop;
  }

  preCalculPrometheus(service :any) : {field: string, value: string}[] {
    let props : {field: string, value: string}[] = [];
    var unit : string = "";
    var number : string = "";

    for (let p of service.prop) {
      if (p.family == "Managed Collector" && p.field != "Number of collectors") {
        if (p.field == "Unit") {
          unit = p.value;
        }
        if (p.field == "Number of Samples collected") {
          number = p.value;
        }
      } else {
        props.push({field: p.field, value: p.value});
      }
    }
    props.push({field: "Number of Samples collected-"+unit, value: number})
    return props;
  }

  preCalculLB(service :any) : {field: string, value: string}[] {
    let props : {field: string, value: string}[] = [];
    let families = ["Processed bytes (Lambda functions as targets)", "Processed bytes (EC2 Instances and IP addresses as targets)", "Average number of new connections per ALB", "Average connection duration"];
    let oneProp : any;

    for (let p of service.prop) {
      if (!families.includes(p.family)) {
        props.push({field: p.field, value: p.value});
      }
    }

    for (let fam of families) {
      oneProp = this.preCalculLB2(this.preCalculLB1(fam, service.prop))
      props.push(oneProp);
    }

    return props;
  }

  preCalculLB1(family: string, props: any []) : any [] {
    return props.filter((item) => { return item.family == family});

  }

  preCalculLB2(miniProps: any[]) : any {
    var unit : string = "";
    var number : string = "";
    var fam : string = "";

    for (let p of miniProps) {
      if (p.field.startsWith("unit")) {
        unit = p.value;
        fam = p.family;
      }
      if (p.field.startsWith("Value")) {
        number = p.value;
      }
    }

    return {field: fam + "-" + unit, value: number};
  }

  preCalculVPN(service :any) : {field: string, value: string}[] {
    let props : {field: string, value: string}[] = [];
    var unit : string = "";
    var number : string = "";

    for (let p of service.prop) {
      if (p.family == "Site-to-Site VPN settings" && p.field != "Number of Site-to-Site VPN Connections") {
        if (p.field == "Unit") {
          unit = p.value;
        }
        if (p.field == "Average duration for each connection") {
          number = p.value;
        }
      } else {
        props.push({field: p.field, value: p.value});
      }
    }
    props.push({field: "Average duration for each connection-"+unit, value: number})
    return props;
  }


}
