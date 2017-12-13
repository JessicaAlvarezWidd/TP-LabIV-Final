import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class Pedido
{
  public id_pedido : any;
  public id_empleado : any;
  public id_cliente : any;
  public id_local : any;
  public monto : any;  
  public fecha : string;  
  public estado : string;

  constructor(emp=37,cliente,local,total,fecha,estado) 
  {
    this.id_empleado = emp;
    this.id_cliente = cliente;
    this.id_local = local;
    this.monto = total;
    this.fecha = fecha;
    this.estado = estado;
  }


}
