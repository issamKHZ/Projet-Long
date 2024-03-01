import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EksSimulatorComponent } from './eks-simulator/eks-simulator.component';
import { AksSimulatorComponent } from './aks-simulator/aks-simulator.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'eks', component:EksSimulatorComponent},
  {path:'aks', component:AksSimulatorComponent},
  {path:'eks-calculator', component:EksSimulatorComponent},
  {path:'aks-calculator', component:AksSimulatorComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
