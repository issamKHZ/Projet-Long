import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EksSimulatorComponent } from './eks-simulator/eks-simulator.component';
import { AksSimulatorComponent } from './aks-simulator/aks-simulator.component';
import { EksFormulaireComponent } from './eks-formulaire/eks-formulaire.component';
import { EksResultComponent } from './eks-result/eks-result.component';
import { AksResultComponent } from './aks-result/aks-result.component';
import { AksFormulaireComponent } from './aks-formulaire/aks-formulaire.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    SideBarComponent,
    WelcomeComponent,
    EksSimulatorComponent,
    AksSimulatorComponent,
    EksFormulaireComponent,
    EksResultComponent,
    AksResultComponent,
    AksFormulaireComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
