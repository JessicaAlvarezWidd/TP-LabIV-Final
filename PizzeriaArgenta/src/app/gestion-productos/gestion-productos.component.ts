import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice/apiservice.service';
import {Observable} from 'rxjs/Observable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  public productos:Observable<any>;
  public mostrar:boolean;
  public mostrarModificar:boolean = false;
  public productoAmodificar;
  public tipoUsuario;

  constructor(public formBuilder: FormBuilder,private apiService:ApiserviceService, private router: Router) {
     
      if(localStorage.getItem('token')=="null"){
          alert("No podes ver esta sección");
      }
      else{
         this.traerUser();         
      }
    this.traerProductos();
    this.mostrar=true;

  }

  traerUser(){
     this.apiService.decodeToken(localStorage.getItem('token')).subscribe(r=>{
           this.tipoUsuario=r['tokenDecode']['usuario'][0].tipo;
        });
  }

  ngOnInit() {
  }

  traerProductos(){
    this.apiService.traerProductos().subscribe(datos=> { this.productos = datos });    
 
  }

  modificarProducto(datos){
    // TENGO EL PRODUCTO MODIFICADO
    this.apiService.ModificarProducto(datos).subscribe(response =>{
          if(response){
            alert("Producto Modificado");
            this.mostrar = true;
            this.mostrarModificar=false;
            this.traerProductos();
          }
    });
    
  }

  agregarProduco(datos) {
    this.apiService.AgregarProducto(datos).subscribe(response =>{
         if(response){
            alert("Producto Agregado");
            this.mostrar = true;
            this.traerProductos();
          }
    });
    
  }

  mostrarFormModificar(prod){
    this.productoAmodificar = prod ;
    this.mostrarModificar = true ;
  }

eliminarProducto(id)
   {
     
     alert("Producto Eliminado");   
     this.traerProductos();   
     this.router.navigate(['/Inicio']);
         
     this.apiService.EliminarProducto(id).subscribe(r=>{
               if(r.exito){                
                this.traerProductos(); 
              }        
              alert(r.mensaje);               
      });
      //this.router.navigate(['/gestionProductos']);
      
   }

  crearCSV(){
    let csv = new Angular2Csv(this.productos, 'Productos');
  }

}



