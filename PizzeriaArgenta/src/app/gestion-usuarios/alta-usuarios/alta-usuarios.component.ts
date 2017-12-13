import { Component, OnInit,Input, Output, EventEmitter, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 
import { ApiserviceService } from '../../apiservice/apiservice.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.css'],
  inputs:['frmCliente','frmEmpleado']
})
export class AltaUsuariosComponent implements OnInit {

  @ViewChild("search")  public searchElementRef: ElementRef;
  @Output() public eventoCliente=new EventEmitter<any>();
  @Output() public eventoEmpleado=new EventEmitter<any>();
  @Output() public eventocancelar=new EventEmitter<any>();
  public formUsuarios:FormGroup;
  public elegirSexo:boolean=false;
  public elegirTipo:boolean=false;
  public elegirEstado:boolean=false;
  public existeEmail:boolean=false;
  public datoLugar;
  public tipoUsuario;

  constructor(public formBuilder: FormBuilder, private apiService:ApiserviceService,
              private mapsAPILoader: MapsAPILoader,private ngZone: NgZone) { 
       if(localStorage.getItem('token')=="null"){
          alert("No podes ver esta sección");
      }
      else{
         this.traerUser();         
      }

     let EMAIL_REGEXP =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formUsuarios=this.formBuilder.group({
        nombre:[null, Validators.compose([Validators.minLength(2),Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]*$'), Validators.required])],
        apellido:[null, Validators.compose([Validators.minLength(2),Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]*$') ,Validators.required])],
        sexo:[null,Validators.compose([Validators.required])], 
        direccion:[null, Validators.compose([Validators.required,Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s|,|.|º|ª]+$')])],
        telefono:[null, Validators.compose([Validators.minLength(6),Validators.pattern('^[0-9]*$'),Validators.required])],        
        email:[null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
        password:[null, Validators.compose([Validators.minLength(6), Validators.required])],
        tipo:[null,Validators.compose([Validators.required])],
        estado:[null,Validators.compose([Validators.required])], 
      });  
  }

  traerUser(){
     this.apiService.decodeToken(localStorage.getItem('token')).subscribe(r=>{
           this.tipoUsuario=r['tokenDecode']['usuario'][0].tipo;
        });
  }

    ngOnInit() { 
       this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"],
          componentRestrictions: {country: 'Ar'}
        });
        autocomplete.addListener("place_changed", () => {
           this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
               this.datoLugar=null;
            }
            else{
              console.log(place);
              this.datoLugar=place.formatted_address;
            }
          });  
        });
    });
  }


  agregarUsuario(){

        let datos=this.formUsuarios.value;
        console.log(datos);

        if(this.formUsuarios.value.sexo == null){
            this.elegirSexo=true;
        }
        if(this.formUsuarios.value.tipo == null){
            this.elegirTipo=true;
        }
        if(this.formUsuarios.value.estado == null){
            this.elegirEstado=true;
        }
        else if (!this.formUsuarios.valid || this.existeEmail || this.formUsuarios.value.tipo == "Seleccionar"   || this.formUsuarios.value.estado == "Seleccionar"){        
          alert("Datos Incorrectos o Faltan Datos");
        } 
        else {
                if(this.formUsuarios.value.tipo=="Cliente"){
                   this.agregarCliente(datos);
                }
                else{
                  this.agregarEmpleado(datos);
                }
        }
   
  }

   agregarCliente(datos){
    this.resetForms();              
    this.eventoCliente.emit(datos);
  }

  agregarEmpleado(datos){
    this.resetForms();             
    this.eventoEmpleado.emit(datos);
  }

  cancelar(){
    this.eventocancelar.emit(true);
  }

  resetForms(){
    this.formUsuarios.reset();
    this.elegirSexo=false;
    this.elegirEstado=false;
    this.elegirTipo=false;
    this.existeEmail=false;
  }

  verificarEmail(emailingresado){
    this.existeEmail=false;
    this.apiService.traerEmails().subscribe(e=>{
            e.forEach(dato => {
               if(dato.email==emailingresado){
                 this.existeEmail=true;                 
               }
            });
    });
  }
}
