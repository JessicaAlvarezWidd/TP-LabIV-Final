import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from './apiservice/apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public tipoUser;
  public noingreso;

  constructor(private router: Router, private apiService:ApiserviceService) {
      
      if(localStorage.getItem('token')=="null"){
          this.noingreso=false;
      }
      else{
         this.traerUser();         
      }
     
     this.router.navigate(['/Inicio']);
  }

  traerUser(){
     this.apiService.decodeToken(localStorage.getItem('token')).subscribe(r=>{
           this.tipoUser=r['tokenDecode']['usuario'][0].tipo;
           this.noingreso=true;
        });
  }

   salir()
  {
    localStorage.setItem('token', null);
    console.log(localStorage.getItem('token'));
    window.alert("Saliste");
    this.router.navigate(['/Salir']);
    location.reload();
  }

}

