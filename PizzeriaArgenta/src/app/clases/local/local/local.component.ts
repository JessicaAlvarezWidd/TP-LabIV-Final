import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class Local
{
  public id_local : any;
  public direccion : string;
  public foto1 : string; 
  public foto2: string;  
  public foto3 : string;
  public id_encargado : number;

  constructor(datos) 
  {
    this.id_local = datos.id_local;
    this.direccion = datos.direccion;
    this.foto1 = datos.foto1;
    this.foto2 = datos.foto2;
    this.foto3=datos.foto3;
    this.id_encargado = datos.id_emp;
  }
}
