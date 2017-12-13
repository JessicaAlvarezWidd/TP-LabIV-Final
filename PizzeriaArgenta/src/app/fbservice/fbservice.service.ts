import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class FbserviceService {

  locales:FirebaseListObservable<any>;
  productos:FirebaseListObservable<any>;
  ofertas:FirebaseListObservable<any>;
  empleados:FirebaseListObservable<any>;

  constructor(private AFD:AngularFireDatabase) {
      
   }

   traerLocales(){
     return this.AFD.list('/locales');
   }

   traerTodoslosProductos(){
      return this.AFD.list('/productos');
   }

   traerTodaslastraerOfertas(){
      return this.AFD.list('/ofertas');
   }

   traerEmpleados(){    
      return this.AFD.list('/empleados');
   }

   traerProductosPorLocal(key){    
      return this.AFD.list('/productos', {
                          query: {
                            orderByChild: 'local',
                            equalTo: key,
                          }
                        });
   }

   traerOfertasPorLocal(key){    
       return this.AFD.list('/ofertas', {
                          query: {
                            orderByChild: 'local',
                            equalTo: key,
                          }
                        });
   }

   agregarLocal()
   {
     this.locales=this.traerLocales();

     this.locales.push({
        direccion:{calle:"",altura:"",barrio:""},
        foto1:"",
        foto2:"",
        foto3:"",
       })
       .then(ref=>{console.log(ref.key)});
   }

   agregarProducto()
   {
     this.productos=this.traerTodoslosProductos();

     this.productos.push({
        direccion:{calle:"",altura:"",barrio:""},
        foto1:"",
        foto2:"",
        foto3:"",
       })
       .then(ref=>{console.log(ref.key)});
   }

    agregarOferta()
   {
     this.ofertas=this.traerTodaslastraerOfertas();

     this.ofertas.push({
        direccion:{calle:"",altura:"",barrio:""},
        foto1:"",
        foto2:"",
        foto3:"",
       })
       .then(ref=>{console.log(ref.key)});
   }

}
