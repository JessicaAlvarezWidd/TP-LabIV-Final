import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { Oferta } from '../clases/oferta/oferta/oferta.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-gestion-ofertas',
  templateUrl: './gestion-ofertas.component.html',
  styleUrls: ['./gestion-ofertas.component.css']
})
export class GestionOfertasComponent implements OnInit {

  public ofertas:Observable<any>;
  public mostrar:boolean;
  public mostrarModificar:boolean;
  public ofetaSeleccionada:Oferta;

    constructor(private apiService:ApiserviceService) {
     
      this.traerOfertas();
      this.mostrar=true;
      this.mostrarModificar=false;
  }

  traerOfertas(){
      this.apiService.traerOfertas().subscribe(datos=>{this.ofertas=datos});
   }

  mostrarFormModificar(oferta){
    this.ofetaSeleccionada=new Oferta(oferta);
    console.log(this.ofetaSeleccionada);
    this.mostrarModificar=true;
  }

  agregarOferta(nuevaOferta){
    this.apiService.agregarOferta(nuevaOferta).subscribe(r=>{
            if(r.exito){
              this.traerOfertas();
              this.mostrar=true;
            }
            alert(r.mensaje);
    });
  } 
  
  EliminarOferta(idOf){
    this.apiService.EliminarOferta(idOf).subscribe(r=>{
           if(r.exito){
                this.mostrar=true;
                this.traerOfertas(); 
              }        
              alert(r.mensaje); 
    });
  }

  modificarOferta(ofertaModificada){
    console.log(ofertaModificada);
    this.apiService.ModificarOferta(ofertaModificada).subscribe(r=>{
        if(r.exito){
          this.mostrar=true;
          this.mostrarModificar=false;
          this.traerOfertas();
        }    
        alert(r.mensaje); 
    });
  }

  ngOnInit() {
  } 

}
