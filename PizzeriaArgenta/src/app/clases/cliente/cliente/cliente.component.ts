import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario/usuario/usuario.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class Cliente extends Usuario 
{
  public id_cliente : number;

  constructor(datos) 
  {
    super(datos);
    this.id_cliente = datos.id_cliente;    
  }


}
