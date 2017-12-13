import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { Usuario } from '../clases/usuario/usuario/usuario.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  public usuarios:Observable<any>;
  public mostrar:boolean;
  public mostrarModificar:boolean;
  public userSeleccionado:Usuario;
  public userOriginal:Usuario;
  public tipoUsuario;

  constructor(public formBuilder: FormBuilder,private apiService:ApiserviceService) {
     
      if(localStorage.getItem('token')=="null"){
          alert("No podes ver esta sección");
      }
      else{
         this.traerUser();         
      }
      this.traerusuarios();
      this.mostrar=true;
      this.mostrarModificar=false;
  }

  traerUser(){
     this.apiService.decodeToken(localStorage.getItem('token')).subscribe(r=>{
           this.tipoUsuario=r['tokenDecode']['usuario'][0].tipo;
        });
  }

   agregarCliente(datos){
      this.apiService.AgregarCliente(datos).subscribe(r=>{ 
        if(r.exito){
          this.mostrar=true;          
          this.traerusuarios(); 
        }      
          alert(r.mensaje);             
      
    });
   }

   agregarEmpleado(datos){
      this.apiService.AgregarEmpleado(datos).subscribe(r=>{ 
        if(r.exito){
          this.mostrar=true;
          this.traerusuarios(); 
        }        
        alert(r.mensaje); 
    });  
   }

    traerusuarios(){
      this.apiService.traerUsuarios().subscribe(datos=>{this.usuarios=datos});
   }


   EliminarUsuario(id)
   {
      this.apiService.EliminarUsuario(id).subscribe(r=>{
               if(r.exito){
                this.traerusuarios(); 
              }        
              alert(r.mensaje); 
      });
   }

  ngOnInit() {
  }

  mostrarFormModificar(usuarioSeleccionado){
    this.mostrarModificar=true;
    this.userOriginal=new Usuario(usuarioSeleccionado);
    this.userSeleccionado=new Usuario(usuarioSeleccionado);
  }

  modificarUsuario(usuarioModificado){
    this.mostrarModificar=false;
    //console.log(usuarioModificado);
    this.apiService.ModificarUsuarios(usuarioModificado).subscribe(r=>{
               if(r.exito){
                this.traerusuarios(); 
              } 
               alert(r.mensaje); 
    });
  }

}
