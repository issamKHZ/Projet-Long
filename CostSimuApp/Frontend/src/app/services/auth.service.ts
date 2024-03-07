import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  readonly API_URL = 'http://localhost:9010';
  readonly LOGIN_ENDPOINT = '/auth/login';
  readonly REGISTER_ENDPOINT = '/auth/register';

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) {}

    register(appName: string, password: string): Observable<any> {
      const data = {
        appName: appName,
        mdp: password
      };

      return this.httpClient.post(this.API_URL + this.REGISTER_ENDPOINT, {}, { params: data, responseType: 'text' }).pipe(
        map((response: any) => {
          // Traitement de la réponse réussie
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          // Retourne le texte du corps de la réponse même en cas d'erreur HTTP
          return throwError(error.error.text || 'Something went wrong; please try again later.');
        })
      );
    }

    login(appname: string, password: string): Observable<any> {
      const data = {
        appName: appname,
        mdp: password
      };

      return this.httpClient.post(this.API_URL + this.LOGIN_ENDPOINT, {}, { params: data, responseType: 'json' }).pipe(
        map((response: any) => {
          // Traitement de la réponse réussie
          // Stocker le token dans le localStorage
          //localStorage.setItem('access_token', response.accessToken);
           // Enregistrez le token dans le cookie
          this.cookieService.set('token', response.token, undefined, undefined, undefined, true, 'Strict');
          this.cookieService.set('appName', response.appname, undefined, undefined, undefined, true, 'Strict');
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          // Retourne le texte du corps de la réponse même en cas d'erreur HTTP
          return throwError(error.error.text || 'Something went wrong; please try again later.');
        })
      );
    }
    isLoggedIn(): boolean {
      //const token = localStorage.getItem('access_token');
      // Check if the token is expired. If it is, the user is not logged in.
      //return !this.jwtHelper.isTokenExpired(token);
      return this.cookieService.check('token');
    }

    LogOut() {
      this.cookieService.deleteAll();
      localStorage.clear();
    }

}
