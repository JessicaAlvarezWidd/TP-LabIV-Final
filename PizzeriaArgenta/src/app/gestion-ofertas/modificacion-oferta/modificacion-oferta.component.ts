import {  Component, OnInit,Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice/apiservice.service';
import { Oferta } from '../../clases/oferta/oferta/oferta.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-modificacion-oferta',
  templateUrl: './modificacion-oferta.component.html',
  styleUrls: ['./modificacion-oferta.component.css']
})
export class ModificacionOfertaComponent implements OnInit {

  @Input() Oferta:Oferta
  @Output() public eventoOferta=new EventEmitter<any>();
  @Output() public eventocancelar=new EventEmitter<any>();
  public productosSel:Array<any>=[];
  public pOferta:Array<any>=[];
  public formOferta:FormGroup;
  public elegirProductos:boolean=false

 constructor(public formBuilder: FormBuilder, private apiService:ApiserviceService) { 
        
    this.formOferta=this.formBuilder.group({
        nombre:[null, Validators.compose([Validators.required])],
        descripcion:[null, Validators.compose([Validators.required])],
        monto:[null, Validators.compose([Validators.required,Validators.pattern('[0-9]+([.][0-9]{1,2})?$')])]
      }); 

  }

  ngOnChanges() {
    this.traerProductosdelaOferta(this.Oferta.id_oferta);
    this.traerProductos(); 
  }

  traerProductosdelaOferta(ido){
    this.apiService.traerProductossdelaOferta(ido).subscribe(p=>{this.pOferta=p});
  }

  traerProductos(){
   console.log("entropod");
    this.apiService.traerProductos().subscribe(p=>{
          p.forEach(p => {
            let datos={nombre:p.nombre, value:p.id_producto, checked:false};
            for(let i=0;i<this.pOferta.length;i++){ 
              if(this.pOferta[i].id_producto==p.id_producto){
                datos.checked=true;
              }                  
            }
            this.productosSel.push(datos);
            console.log(this.productosSel);
          });
    });
  }

  modificarOferta(){        

        let p:Array<any>=this.opcionesSeleccionadas();
        if(p.length == 0){
            this.elegirProductos=true;
        }              
        if (!this.formOferta.valid || this.elegirProductos){        
          alert("Datos Incorrectos o Faltan Datos");
        } 
        else {
             console.log(this.Oferta.id_oferta);
            let datos=new FormData();
            datos.append("idOferta",this.Oferta.id_oferta);
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

   resetForms(){
    this.formOferta.reset();
    this.productosSel=[];
    this.elegirProductos=false;
  }

  cancelar(){
    this.eventocancelar.emit(false);
  }

  ngOnInit() {
  }

}
