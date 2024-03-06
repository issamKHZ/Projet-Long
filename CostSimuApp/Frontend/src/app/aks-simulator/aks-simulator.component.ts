import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aks-simulator',
  templateUrl: './aks-simulator.component.html',
  styleUrl: './aks-simulator.component.scss'
})
export class AksSimulatorComponent {

  sectionData !: any;
  section !: string;

  constructor(private router : Router, private authService : AuthService) {
    this.sectionData = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    if (this.sectionData){
      console.log(this.sectionData);
      this.section = this.sectionData.content;
    }
  }

  isLoggedIn() :boolean {
    return this.authService.isLoggedIn();
  }
}
