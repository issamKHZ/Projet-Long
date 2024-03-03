import { globalService } from './../services/globalService';
import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  appName : string = '';
  password : string = '';

  nameErrorSaisie: string = '';
  lnameErrorSaisie: string = '';
  registedSucced: string = '';
  errorUseNameMdp : boolean = false;
  stringUseNameMdp : string = '';
  verification: boolean =false;
  reponseError: boolean = false;

  constructor(private authService: AuthService,
              private cookiesService: CookieService,
              private globalService: globalService) {}

  checkTousChampsPresent() : boolean{
    return this.appName != '' &&
           this.password != '';
  }

  onSubmit(form: NgForm) {
    this.verification = true;
    if (this.appName === '' || this.password === '') {
      this.errorUseNameMdp = true;
      this.stringUseNameMdp = 'Veuillez saisir ton ident et mdp';
    }
    if (this.appName != '' && this.password != '') {
      this.authService.login(this.appName, this.password).subscribe((response) => {
        this.appName = '';
        this.password = '';
        this.verification = false;

        this.globalService.redirectTo('/home');


      },
      (error) => {
        this.errorUseNameMdp = true;
        this.stringUseNameMdp = 'Incorrect Application name or Password';
      }
      );
    }
  }
}
