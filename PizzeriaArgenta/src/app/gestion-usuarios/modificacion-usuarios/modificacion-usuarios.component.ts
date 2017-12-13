import {  Component, OnInit,Input, Output, EventEmitter, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 
import { ApiserviceService } from '../../apiservice/apiservice.service';
import { Usuario } from '../../clases/usuario/usuario/usuario.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-modificacion-usuarios',
  templateUrl: './modificacion-usuarios.component.html',
  styleUrls: ['./modificacion-usuarios.component.css']
})
export class ModificacionUsuariosComponent implements OnInit {

  @ViewChild("search")  public searchElementRef: ElementRef;
  @Output() public eventoModificar=new EventEmitter<any>();
  @Output() public eventocancelar=new EventEmitter<any>();
  @Input() user:Usuario;
  @Input() UsuarioOriginal:Usuario;  
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
              this.user.direccion=place.formatted_address;
            }
          });  
        });
    });
  }

  ModificarUsuario(){

       if(this.user.compararUsuarios(this.UsuarioOriginal)){
         alert("No modificaste nada!");
       }
       else{

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
            console.log(this.user);
               this.eventoModificar.emit(this.user);
          }
       }      
  }

  cancelar(){
    this.eventocancelar.emit(false);
  }

  verificarEmail(emailingresado){
    this.existeEmail=false;
    this.apiService.traerEmails().subscribe(e=>{
            e.forEach(dato => {
               if(dato.email==emailingresado && emailingresado!=this.UsuarioOriginal.email){
                 this.existeEmail=true;                 
               }
            });
    });
  }

}
