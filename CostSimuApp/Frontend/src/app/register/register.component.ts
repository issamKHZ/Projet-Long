import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  appName : string = '';
  password : string = '';

  nameErrorSaisie: string = '';
  lnameErrorSaisie: string = '';
  registedSucced: string = '';
  errorUseNameMdp : boolean = false;
  stringUseNameMdp : string = '';
  verification: boolean =false;
  reponseError: boolean = false;

  passwordFieldType: string = 'password';




  constructor(private authService: AuthService) {}


  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  goToLogin() {
    this.registedSucced = '';
  }

  checkTousChampsPresent() : boolean{
    return this.appName != '' &&
           this.password != '';
  }

  onSubmit(form: NgForm) {
    this.verification = true;
    if (this.checkTousChampsPresent()) {
      this.authService.register(this.appName, this.password).subscribe((reponse) => {
          console.log(reponse);
          if (reponse === "saved") {
            this.registedSucced = 'Inscription réussie';
            this.appName = '';
            this.password = '';
            this.verification = false;
            this.reponseError = false;
          } else {
            this.reponseError = true;
            this.registedSucced = reponse;
          }
      });
    }
  }
}

