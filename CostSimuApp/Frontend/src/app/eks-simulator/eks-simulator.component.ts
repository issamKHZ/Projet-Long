import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-eks-simulator',
  templateUrl: './eks-simulator.component.html',
  styleUrl: './eks-simulator.component.scss'
})
export class EksSimulatorComponent implements OnInit{

  sectionData !: any;
  section !: string;

  constructor(private router : Router) {
    console.log("enter to sim  eks constructor")
    this.sectionData = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    if (this.sectionData){
      console.log(this.sectionData);
      this.section = this.sectionData.content;
      console.log("eks section is : ", this.section);
    }
  }


}
