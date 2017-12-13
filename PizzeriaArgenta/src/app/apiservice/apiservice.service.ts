import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class ApiserviceService {

  
  private path:string="http://localhost/api_rest_p/index.php/";
  //private path:string="http://jessicaalvarez.hol.es/api_rest/index.php/";

  constructor(private http : Http, private authHttp: AuthHttp) { }


//----------------------------Locales----------------------------//

              
    traerLocales():Observable<any>
    {
        return this.http.get(this.path + "locales/traerLocales")
                        .map(response => response.json());
    }  

    agregarLocal(local):Observable<any>
    {
        return this.http.post(this.path + "agregarLocal",local)
                        .map(res => res.json());
    } 

    traerofertasdelLocal(idLocal):Observable<any>
    {
        return this.http.get(this.path + "local/ofertas/" + idLocal)
                        .map(response => response.json());
    } 

    traerProductossdelLocal(idLocal):Observable<any>
    {
        return this.http.get(this.path + "local/productos/" + idLocal)
                        .map(response => response.json());
    }
    
    traerEmpleadosdelLocal(idLocal):Observable<any>
    {
        return this.http.get(this.path + "local/empleados/" + idLocal)
                        .map(response => response.json());
    } 

    ModificarLocal(localModificado):Observable<any>
    {
        return this.http.post(this.path + "modificarLocal",localModificado)
                        .map(res => res.json());
    }
    
    EliminarLocal(idLocal):Observable<any>
    {
        let datos = {"id": idLocal};
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
        headers: headers,
        body : datos
      });
      
      return this.http.delete(this.path + "eliminarLocal", options)
                      .map(response =>  response.json()) ;
    }  
//----------------------------Pedidos----------------------------//
    agregarPedido(pedido):Observable<any>
    {
        return this.http.post(this.path + "agregarPedido",pedido)
                        .map(res =>res.json());
    }
    
    traerPedidosdelCliente(id):Observable<any>
    {
        return this.http.get(this.path + "pedidos/cliente/" + id)
                        .map(response => response.json());
    }

     traerTodosLosPedidos():Observable<any>
    {
        return this.http.get(this.path + "pedidos")
                        .map(response => response.json());
    }

    traerProductossdelPedido(id):Observable<any>
    {
        return this.http.get(this.path + "pedido/productos/" + id)
                        .map(response => response.json());
    }

    cambiarEstadoPedido(id):Observable<any>
    {
        return this.http.get(this.path + "pedido/estado/" + id)
                        .map(response => response.json());
    }

    traerDetallesdelPedido():Observable<any>
    {
        return this.http.get(this.path + "detallePedidos")
                        .map(response => response.json());
    }
//----------------------------Productos----------------------------// 
    traerProductos():Observable<any>
    {
        return this.http.get(this.path + "productos/TraerProductos")
                        .map(response => response.json() );
    }

    AgregarProducto(datos): Observable<any> {
      return this.http.post(this.path + "agregarProducto", datos)
        .map(response => response.json())
        .catch(err => {return "ERROR" });
    }
    
    ModificarProducto(datos): Observable<any> {
      return this.http.post(this.path + "modificarProducto", datos)
        .map(response => response.json())
        .catch(err => {return "ERROR" });
    }

    EliminarProducto(id_prod):Observable<any>
    {
        let datos = {"id": id_prod};

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
        headers: headers,
        body : datos
      });
      
      return this.http.delete(this.path + "eliminarProducto", options)
                      .map(response =>  response.json()) ;
    } 

    ProductosPorLocal(idLocal):Observable<any>
    {
        return this.http.get(this.path + "productos/local/" + idLocal)
                        .map(response => response.json());
    }

//----------------------------Ofertas----------------------------//  
    traerOfertas():Observable<any>
    {
        return this.http.get(this.path + "ofertas/TraerOfertas")
                        .map(response => response.json() );
    }

    agregarOferta(Oferta):Observable<any>
    {
        return this.http.post(this.path + "agregarOferta",Oferta)
                        .map(res => res.json());
    }

    EliminarOferta(id_oferta):Observable<any>
    {
        let datos = {"id": id_oferta};

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
        headers: headers,
        body : datos
      });
      
      return this.http.delete(this.path + "eliminarOferta", options)
                      .map(response =>  response.json()) ;
    } 

    ModificarOferta(ofertaModificada):Observable<any>
    {
        
        return this.http.post(this.path + "modificarOferta",ofertaModificada)
                        .map(res => res.json());
    }

    traerProductossdelaOferta(idOferta):Observable<any>
    {
        return this.http.get(this.path + "oferta/productos/" + idOferta)
                        .map(response => response.json());
    }

    OfertasPorLocal(idLocal):Observable<any>
    {
        return this.http.get(this.path + "ofertas/local/" + idLocal)
                        .map(response => response.json());
    }
//----------------------------Usuarios----------------------------//

   traerUsuarios():Observable<any>
    {
        return this.http.get(this.path + "usuarios/TraerUsuarios")
                        .map(response =>  response.json()) ;
    }

    traerEmails():Observable<any>
    {
        return this.http.get(this.path + "usuarios/Emails")
                        .map(response =>  response.json()) ;
    }

    EliminarUsuario(id_usuario):Observable<any>
    {
        let datos = {"id": id_usuario};

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
        headers: headers,
        body : datos
      });
      
      return this.http.delete(this.path + "eliminarUsuario", options)
                      .map(response =>  response.json()) ;
    }

    ModificarUsuarios(usuarioModificado):Observable<any>
    {
        return this.http.post(this.path + "modificarUsuario",usuarioModificado)
                        .map(res => res.json());
    }

    traerUsuarioPorEmail(dato):Observable<any>{
         return this.http.post(this.path + "buscarUsuario", dato)
                         .map(response =>response.json());
    }

//----------------------------Clientes----------------------------//

    AgregarCliente(datos):Observable<any>
    {          
      return this.http.post(this.path + "agregarCliente",datos)
                      .map(res => res.json());
    }
    
//----------------------------Empleados----------------------------//

    AgregarEmpleado(datos):Observable<any>
    {          
      return this.http.post(this.path + "agregarEmpleado",datos)
                      .map(res => res.json());
    }

    TraerEmpleadosDisponibles():Observable<any>
    {          
      return this.http.get(this.path + "empleados/empleadosDisponibles")
                      .map(res => res.json());
    }

//----------------------------Token----------------------------//

 GenerarToken(user):Observable<any> 
    {   
        console.log(user);             
        return this.http.post(this.path + "crearToken", user)
                        .map(res => res.json())
    }

    decodeToken(token):Observable<any>
    {
        return this.authHttp.get(this.path + "obtenerToken")
                      .map(response =>response.json());
    } 

//----------------------------Estadisticas----------------------------//
    traerVentasPorLocales():Observable<any>
    {
        return this.http.get(this.path + "locales/traerVentas")
                        .map(response => response.json());
    }    

    traerVentasPorLocalesYEmpleado():Observable<any>
    {
        return this.http.get(this.path + "locales/traerVentasemmpleado")
                        .map(response => response.json());
    }  

    traerVentasCliente():Observable<any>
    {
        return this.http.get(this.path + "locales/traerclientesventas")
                        .map(response => response.json());
    }  

    traerImportesPorDia():Observable<any>
    {
        return this.http.get(this.path + "locales/importesPorDia")
                        .map(response =>response.json());
    }  
}
