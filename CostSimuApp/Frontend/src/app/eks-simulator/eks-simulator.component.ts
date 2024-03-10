import { AuthService } from './../services/auth.service';
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
  load !: any;
  data !: any;

  constructor(private router : Router, private authService: AuthService) {
    this.sectionData = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    if (this.sectionData){
      this.data = this.sectionData.calcul;
      this.section = this.sectionData.content;
      this.load = this.sectionData.load;
    }
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

}
