import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { Local } from '../clases/local/local/local.component';
import { Observable } from 'rxjs/Observable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-locales',
  templateUrl: './gestion-locales.component.html',
  styleUrls: ['./gestion-locales.component.css']
})
export class GestionLocalesComponent implements OnInit {

  public locales:Observable<any>;
  public mostrar:boolean;
  public mostrarModificar:boolean;
  public localSeleccionado:Local;
  public pLocal:Array<any>=[];
  public oLocal:Array<any>=[];
  public emplLocal:Array<any>=[];
  public tipoUsuario;

  constructor(public formBuilder: FormBuilder,private apiService:ApiserviceService, private router: Router) {

      if(localStorage.getItem('token')=="null"){
          alert("No podes ver esta sección");
      }
      else{
         this.traerUser();         
      }

      this.traerLocales();
      this.mostrar=true;
      this.mostrarModificar=false;
  }

  traerUser(){
     this.apiService.decodeToken(localStorage.getItem('token')).subscribe(r=>{
           this.tipoUsuario=r['tokenDecode']['usuario'][0].tipo;
        });
  }


  traerLocales(){
      this.apiService.traerLocales().subscribe(datos=>{this.locales=datos});
   }

  mostrarFormModificar(local){
    this.localSeleccionado=new Local(local);
    console.log(this.localSeleccionado);
    this.mostrarModificar=true;
  }  

  agregarLocal(datos){
    this.apiService.agregarLocal(datos).subscribe(r=>{
          if(r.exito){
            this.mostrar=true;
            this.traerLocales();
          }
          
        //alert(r.mensaje);
    });
    alert("Local creado");
    this.router.navigate(['/Inicio']);
  }

  modificarLocal(localModificado){
    this.apiService.ModificarLocal(localModificado).subscribe(r=>{
        if(r.exito){
          this.mostrar=true;
          this.mostrarModificar=false;
          this.traerLocales();
        }    
        alert(r.mensaje);         
    });
    alert("Local modificado");
    this.router.navigate(['/Inicio']);
  }

  EliminarLocal(idLocal){
    this.apiService.EliminarLocal(idLocal).subscribe(r=>{
           if(r.exito){
                this.traerLocales(); 
              }        
              alert(r.mensaje); 
    });
  }

  ngOnInit() {
  }

  crearCSV(){
    let csv = new Angular2Csv(this.locales, 'Locales');
  }

}
