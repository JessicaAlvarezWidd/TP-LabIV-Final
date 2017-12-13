import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class User {
  public email: string;
  public password: string;

  constructor()
  {
    this.email = '';
    this.password = '';
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   public formIngreso:FormGroup;
   private tcaptcha=false;
   public advertencia=false;
   public user:User=new User();

  constructor(public formBuilder: FormBuilder, private apiService:ApiserviceService, private route: Router) { 
    let EMAIL_REGEXP =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formIngreso=this.formBuilder.group({   
        email:[null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
        password:[null, Validators.compose([Validators.minLength(6), Validators.required])]
      });  
  }

  ngOnInit() {
  }


ingresar()
  {
    
    if(this.formIngreso.valid)
    {
      console.log("enviar");
      this.apiService.GenerarToken( this.formIngreso.value ).subscribe(resp=>{
            if(!resp.exito){
              alert(resp.mensaje);
            }
            else{
              localStorage.setItem('token', resp.tokenGenerado);
              alert("Bienvenido");
              location.reload();
              this.route.navigate(['/Inicio']);
            }
      });
    }
    else{
      alert("DATOS INVALIDOS");
    }

  }

  queuser(usuario){
    switch(usuario){
      case 'cliente':
                      this.user.email="acelia@gmail.com";
                      this.user.password="123456";
                      break;
      case 'empleado':
                      this.user.email="andy@gmail.com";
                      this.user.password="123456";
                      break;   
      case 'encargado':
                      this.user.email="gmar@gmail.com";
                      this.user.password="123456";
                      break;
      case 'administrativo':
                      this.user.email="jess@gmail.com";
                      this.user.password="123456";
                      break;                                              
    }
  }

}

  
