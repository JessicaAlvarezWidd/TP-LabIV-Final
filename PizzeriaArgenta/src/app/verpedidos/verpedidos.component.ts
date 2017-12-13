import { Component, OnInit, NgZone  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../clases/usuario/usuario/usuario.component';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-verpedidos',
  templateUrl: './verpedidos.component.html',
  styleUrls: ['./verpedidos.component.css']
})
export class VerpedidosComponent implements OnInit {

  public datosUser:Observable<any>;
  public Usuario:Usuario;
  private idTipoUsuario;
  public pedidos;
  public productos:Array<any>=[];
  public detalleProd:Observable<any>;
  public color;
  
  constructor(private apiService:ApiserviceService,public formBuilder: FormBuilder,private ngZone: NgZone) { 
      
  }
  traerUsuario(){

       this.apiService.decodeToken(localStorage.getItem('token')).subscribe(r=>{this.datosUser=r;
            this.idTipoUsuario=this.datosUser['tokenDecode']["id_especifico"][0];
            this.Usuario=new Usuario(this.datosUser['tokenDecode']['usuario'][0]);
            console.log(this.Usuario);
            console.log(this.idTipoUsuario);
            if(this.Usuario.tipo=="Cliente"){
               this.apiService.traerPedidosdelCliente(this.idTipoUsuario.id_cliente).subscribe(r=>{this.pedidos=r;});
               this.apiService.traerDetallesdelPedido().subscribe( r=>{this.detalleProd=r;console.log(r)}) ;
            }
            else if(this.Usuario.tipo=="Encargado" || this.Usuario.tipo=="Empleado"){
                this.apiService.traerTodosLosPedidos().subscribe(r=>{this.pedidos=r});          
                this.apiService.traerDetallesdelPedido().subscribe( r=>{this.detalleProd=r;console.log(r)});
            }
        });
  }


  cambiarEstado(id){
    this.apiService.cambiarEstadoPedido(id).subscribe(r=>{this.traerUsuario()});
  }

  Quecolor(estado){
    if(estado=="Espera"){
      this.color = 'rgba(142, 15, 15, 0.99)';
    }
    else{
      this.color = 'rgba(84, 82, 34, 0.94);';
    }
    return this.color;
  }


  ngOnInit() {     
     this.traerUsuario();
    
  }

}
