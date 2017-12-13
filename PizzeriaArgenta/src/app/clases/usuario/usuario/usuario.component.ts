import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class Usuario
{
  public id_usuario : number;
  public nombre : string;
  public apellido : string;
  public email : string;  
  public telefono : number;
  public direccion : string;
  public password : string; 
  public tipo: string;  
  public sexo : string;
  public estado : string;

  constructor(datos) 
  {
    this.id_usuario = datos.id_usuario;
    this.nombre = datos.nombre;
    this.apellido = datos.apellido;
    this.email = datos.email;
    this.telefono=datos.telefono;
    this.direccion = datos.direccion;
    this.password = datos.password;
    this.tipo =datos.tipo;    
    this.sexo = datos.sexo;
    this.estado=datos.estado;
  }

  compararUsuarios(usuariOriginal:Usuario):boolean
  {
     let e=true;

      if(this.nombre!=usuariOriginal.nombre ||
         this.apellido!=usuariOriginal.apellido || 
         this.email!=usuariOriginal.email ||
         this.telefono!=usuariOriginal.telefono ||
         this.direccion!=usuariOriginal.direccion ||
         this.password!=usuariOriginal.password ||
         this.tipo!=usuariOriginal.tipo ||
         this.sexo!=usuariOriginal.sexo ||
         this.estado!=usuariOriginal.estado
       ){
        e=false;
      }

      return e;
  }
}