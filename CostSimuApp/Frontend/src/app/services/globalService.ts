import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class globalService {

  constructor(private router: Router) {}

  redirectTo(path: string) {
    this.router.navigate(['/']);
  }

}
