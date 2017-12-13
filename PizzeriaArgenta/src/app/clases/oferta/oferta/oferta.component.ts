import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class Oferta
{
  public id_oferta : any;
  public nombre : string;
  public descripcion : string;
  public monto : string;  

  constructor(datos) 
  {
    this.id_oferta = datos.id_oferta;
    this.nombre = datos.nombre;
    this.descripcion = datos.descripcion;
    this.monto = datos.monto;
  }


}