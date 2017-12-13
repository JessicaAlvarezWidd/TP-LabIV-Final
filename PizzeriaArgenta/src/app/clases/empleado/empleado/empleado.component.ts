import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario/usuario/usuario.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class Empleado extends Usuario 
{
  public id_emp: number;
  public estado:string;
  public id_local:number;

  constructor(datos) 
  {
    super(datos);
    this.id_emp = datos.id_id_emp; 
    this.estado=datos.estado;
    this.id_local=datos.id_local;   
  }


}