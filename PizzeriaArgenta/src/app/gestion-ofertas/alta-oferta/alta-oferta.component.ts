import { Component, OnInit,Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice/apiservice.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-alta-oferta',
  templateUrl: './alta-oferta.component.html',
  styleUrls: ['./alta-oferta.component.css']
})
export class AltaOfertaComponent implements OnInit {

  @Output() public eventoOferta=new EventEmitter<any>();
  @Output() public eventocancelar=new EventEmitter<any>();
  public productosSel:Array<any>=[];
  public formOferta:FormGroup;
  public elegirProductos:boolean=false;

  constructor(public formBuilder: FormBuilder, private apiService:ApiserviceService) { 
        
    this.traerProductos();
    this.formOferta=this.formBuilder.group({
        nombre:[null, Validators.compose([Validators.required])],
        descripcion:[null, Validators.compose([Validators.required])],
        monto:[null, Validators.compose([Validators.required,Validators.pattern('[0-9]+([.][0-9]{1,2})?$')])]
      }); 
  }

   resetForms(){
    this.formOferta.reset();
    this.productosSel=[];
    this.elegirProductos=false;
  }

  traerProductos(){
    
    this.apiService.traerProductos().subscribe(p=>{
          p.forEach(p => {
            let datos={nombre:p.nombre, value:p.id_producto, checked:false};
            this.productosSel.push(datos);
          });
    });
  }

  agregarOferta(){        

        let p:Array<any>=this.opcionesSeleccionadas();
        if(p.length == 0){
            this.elegirProductos=true;
        }              
        if (!this.formOferta.valid || this.elegirProductos){        
          alert("Datos Incorrectos o Faltan Datos");
        } 
        else {
             
            let datos=new FormData();
            datos.append("nombre",this.formOferta.value.nombre);
            datos.append("descripcion",this.formOferta.value.descripcion);
            datos.append("monto",this.formOferta.value.monto);
            datos.append("productos",JSON.stringify(p));
            this.resetForms();
            this.eventoOferta.emit(datos);
        }
  }

  opcionesSeleccionadas():Array<any>{
    let datos:Array<any>=[];
    
    this.productosSel.forEach(p => {
                       if(p.checked){
                         datos.push({id:p.value});
                       }
                    });

       return datos;             
  }

  verificarCantProd(){
     this.elegirProductos=true;
     let cantProdSeleccionadas=this.opcionesSeleccionadas();
     if(cantProdSeleccionadas.length > 0){
          this.elegirProductos=false;
     }
  }

  cancelar(){
    this.eventocancelar.emit(true);
  }


  ngOnInit() {
  }

}
