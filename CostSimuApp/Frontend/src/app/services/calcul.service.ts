import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculService {

  readonly API_URL = 'http://localhost:9010';
  readonly CALCUL_ENDPOINT = '/estim/calcul';

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
}
