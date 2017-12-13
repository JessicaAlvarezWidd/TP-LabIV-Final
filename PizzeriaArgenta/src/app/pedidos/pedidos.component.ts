import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { Pedido } from '../clases/pedido/pedido/pedido.component';
import { Usuario } from '../clases/usuario/usuario/usuario.component';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public locales:Observable<any>;
  public datosUser:Observable<any>;
  public Usuario:Usuario;
  public ofertas:Observable<any>;
  public productos:Observable<any>;
  public verLocales:boolean=true;
  public cantidadPermitida:boolean=false;
  public queproducto;
  public group: any = {};
  public carrito:Array<any>=[];
  public totalCompra;
  public verCompraARealizar:boolean=false;
  private pedido:Pedido;
  private local;
  private idTipoUsuario;
  private usuarioCliente:Usuario;
  private idclienteEncontrado;
  private pideempleado:boolean=false;
  public formUsuarios:FormGroup;
  public noexisteEmail:boolean=false;
  public usuarioExiste:boolean=false;
  public invitado:boolean;
  private tcaptcha=false;
  public advertencia=false;

  constructor(private apiService:ApiserviceService,public formBuilder: FormBuilder, private router: Router) { 
    this.traerLocales();
    this.traerUsuario();

     let EMAIL_REGEXP =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formUsuarios=this.formBuilder.group({
        email:[null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])]
      });  
  }

  traerLocales(){
      this.apiService.traerLocales().subscribe(datos=>{this.locales=datos});
  }

  traerUsuario(){
   if(localStorage.getItem('token')=="null")
    {
      this.invitado=true;
    }
    else{
         this.apiService.decodeToken(localStorage.getItem('token')).subscribe(r=>{this.datosUser=r;
            this.idTipoUsuario=this.datosUser['tokenDecode']["id_especifico"][0];
            this.Usuario=new Usuario(this.datosUser['tokenDecode']['usuario'][0]);
            if(this.Usuario.tipo=="Cliente"){
                this.usuarioCliente=this.Usuario;
            }
      });
    } 
  }

  buscarProductos(id){
    this.apiService.ProductosPorLocal(id).subscribe(p=>{this.productos=p});
    this.apiService.OfertasPorLocal(id).subscribe(o=>{this.ofertas=o});
    this.local=id;
    this.verLocales=false;
  }

  agregarCarrito(producto,cantidad,i)
  {
    this.verificarCantidad(cantidad,i);
    if(!this.cantidadPermitida){

      this.totalCompra=0;
      let existe=false;
      let p={id:producto.id_producto,nombre:producto.nombre,pu:producto.precio_unitario,cant:cantidad,ptu:(producto.precio_unitario*cantidad)};
        console.log(p);
        for (var i:any = 0; i < this.carrito.length; i++) {
           if(this.carrito[i].id==producto.id_producto)
           {
             this.carrito[i]=p;
             existe=true;
             break;
           }
        }

        if(!existe){this.carrito.push(p)}

        this.carrito.forEach(p => {
            this.totalCompra+=p.ptu;
        });

        console.log(this.carrito);
    }
    else{
      console.log("no podes introducir esa cantidad");
    }
  }

  verificarCantidad(cant,i){
    this.queproducto=i;   
    this.cantidadPermitida=true;
    if(cant>=1 && cant<=10){
      this.cantidadPermitida=false;
    }
  }

  vaciar(){
    this.carrito=[];
    this.totalCompra=0;
  }

  eliminarProducto(i){
    this.totalCompra=0;
    this.carrito.splice(i,1);
     this.carrito.forEach(p => {
            this.totalCompra+=p.ptu;
        });
  }

  comprar(){

    if(this.carrito.length>0){
      
      let fecha=this.obtenerFecha();
      
      if(this.Usuario.tipo=="Cliente"){
        this.pedido=new Pedido( 13,this.idTipoUsuario.id_cliente, this.local, this.totalCompra, fecha,"Espera");
        console.log(this.pedido);
        this.verCompraARealizar=true;
      }
      else if(this.Usuario.tipo=="Empleado" || this.Usuario.tipo=="Encargado") 
      {
        this.pideempleado=true;
        this.verCompraARealizar=true;
      }
    }
    else{
      alert("No hay nada en el carrito");
    }

  }

  obtenerFecha():string{
      let fecha=new Date();
     return fecha.getDate()+'/'+(fecha.getUTCMonth()+1)+'/'+fecha.getFullYear();
  }

  cancelarCompra(){
    this.carrito=[];
    this.totalCompra=0;
    this.verCompraARealizar=false;
    this.noexisteEmail=false;
    this.usuarioExiste=false;
    this.formUsuarios.reset();
  }

  buscarCliente(){
    if(this.formUsuarios.valid){
       let dato={email:this.formUsuarios.value.email}
       this.apiService.traerUsuarioPorEmail(dato).subscribe(r=>{
          this.usuarioExiste=false;
          if(r.length==0)
          {
            this.noexisteEmail=true;
          }
          else{
            this.usuarioCliente=new Usuario(r[0]);
            this.idclienteEncontrado=(r[0].id_cliente);
            this.usuarioExiste=true;
          }
       });
    }
  }

  aceptarCliente(){
    if(this.usuarioExiste){
      let fecha=this.obtenerFecha();
      this.pedido=new Pedido( this.idTipoUsuario.id_emp,this.idclienteEncontrado, this.local, this.totalCompra, fecha,"Espera");
      this.pideempleado=false;
      console.log(this.pedido);
    }
    else{
      alert("Tenes que buscar un usuario");
    }
  }

  resolved(captchaResponse) {
    this.tcaptcha=captchaResponse;
    if(!this.tcaptcha || this.tcaptcha===null){
        this.advertencia=true;
    }
    else{
      this.advertencia=false;
    }
  }

  efectuarCompra(){      
      if(!this.tcaptcha){this.advertencia=true;
      alert("Ingresá el captcha");
    }
    else{
        let datos=new FormData();
      datos.append("idemp",this.pedido.id_empleado);
      datos.append("idcli",this.pedido.id_cliente);
      datos.append("idloc",this.pedido.id_local);
      datos.append("monto",this.pedido.monto);
      datos.append("fecha",this.pedido.fecha);
      datos.append("estado",this.pedido.estado);
      datos.append("carrito",JSON.stringify(this.carrito));
      console.log(this.carrito);
      this.apiService.agregarPedido(datos).subscribe(r=>{
            //alert(r.mensaje);
            //this.router.navigate(['/verPedidos']);              
      });
      alert("Compra realizada");
      this.router.navigate(['/verPedidos']); 
    } 
        
  }

  volveraLocales(){
      this.verCompraARealizar=false;
      this.verLocales=true;
      this.noexisteEmail=false;
      this.usuarioExiste=false;
      this.cantidadPermitida=false;
      this.carrito=[];
      this.totalCompra=0;    
      this.formUsuarios.reset();
  }

  ngOnInit() {
  }

}
