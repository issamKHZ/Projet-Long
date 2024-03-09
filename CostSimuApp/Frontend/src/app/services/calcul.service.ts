import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculService {

  readonly API_URL = 'http://localhost:9010';
  readonly CALCUL_ENDPOINT = '/eks/estim/calcul';
  readonly AKS_ENDPOINT = '/aks/estim/calcul';
  readonly EKS_STOCK_ENDPOINT = '/eks/estim/stocker';
  readonly AKS_STOCK_ENDPOINT = '/aks/estim/stocker';
  readonly EKS_STORED_ENDPOINT = '/eks/estim/stored';
  readonly AKS_STORED_ENDPOINT = '/aks/estim/stored';

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) { }

  calculer(name: string, props: any): Observable<any> {
    const data = {
      appName: name,
      props: props
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookieService.get('token')}`);
    return this.httpClient.post<any>(this.API_URL + this.CALCUL_ENDPOINT, {}, {params: data,  headers });
  }

  calculerAKS(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookieService.get('token')}`);
    return this.httpClient.post(this.API_URL + this.AKS_ENDPOINT, {}, {params: data, headers, responseType:'text' });
  }

  stockEKS(datas: any) {
    let data = {
      serivcesApaye : JSON.stringify(datas.props),
      totalPrice: datas.price,
      appName: this.cookieService.get("appName")
    }
    console.log("data stocke est e: ", data);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookieService.get('token')}`);
    this.httpClient.post(this.API_URL + this.EKS_STOCK_ENDPOINT, {}, {params: data, headers}).subscribe((response) => {
      console.log(response);
    });
  }

  stockAKS(datas: any) {
    let data = {
      serivcesApaye : JSON.stringify(datas.props),
      totalPrice: datas.price,
      appName: this.cookieService.get("appName")
    }
    console.log("data stocke est a: ", data);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookieService.get('token')}`);
    this.httpClient.post(this.API_URL + this.AKS_STOCK_ENDPOINT, {}, {params: data, headers}).subscribe((response) => {
      console.log(response);
    });
  }

  recuperEksStored() : Observable<any>{
    let data = {
      serviceName: "eks",
      appName: this.cookieService.get("appName")
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookieService.get('token')}`);
    return this.httpClient.get(this.API_URL + this.EKS_STORED_ENDPOINT, {params:data, headers});
  }

  recuperAksStored() : Observable<any>{
    let data = {
      serviceName: "aks",
      appName: this.cookieService.get("appName")
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookieService.get('token')}`);
    return this.httpClient.get(this.API_URL + this.AKS_STORED_ENDPOINT, {params:data, headers});
  }
}
