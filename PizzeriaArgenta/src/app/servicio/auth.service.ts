import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

   public name: string;
  private _token: string;
  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor( private router: Router ) {
    this._token = localStorage.getItem('token');
  }

  public isLogued()
  {
    try {

      let rta = tokenNotExpired() || false;
      return rta;
    } catch (error) {
      return false;
    }
  }

  public logOut()
  {
    try {
      localStorage.setItem('token', null);
      this.router.navigate(['/Salir']);
    } catch (error) {
      return false;
    }
  }

}
