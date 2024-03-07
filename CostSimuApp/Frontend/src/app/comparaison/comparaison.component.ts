import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comparaison',
  templateUrl: './comparaison.component.html',
  styleUrl: './comparaison.component.scss'
})
export class ComparaisonComponent {

  constructor(private authService: AuthService) {}

  isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }
}
