import { Component, OnInit,Input, Output, EventEmitter, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 
import { ApiserviceService } from '../apiservice/apiservice.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @ViewChild("search")  public searchElementRef: ElementRef;
  public formUsuarios:FormGroup;
  private tcaptcha=false;
  public advertencia=false;
  public elegirSexo:boolean=false;
  public existeEmail:boolean=false;
  public datoLugar;

  constructor(public formBuilder: FormBuilder, private apiService:ApiserviceService,
              private mapsAPILoader: MapsAPILoader,private ngZone: NgZone, private router: Router) { 
        
     let EMAIL_REGEXP =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formUsuarios=this.formBuilder.group({
        nombre:[null, Validators.compose([Validators.minLength(2),Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]*$'), Validators.required])],
        apellido:[null, Validators.compose([Validators.minLength(2),Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]*$') ,Validators.required])],
        sexo:[null,Validators.compose([Validators.required])], 
        direccion:[null, Validators.compose([Validators.required,Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s|,|.|º|ª]+$')])],
        telefono:[null, Validators.compose([Validators.minLength(6),Validators.pattern('^[0-9]*$'),Validators.required])],        
        email:[null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
        password:[null, Validators.compose([Validators.minLength(6), Validators.required])],
        tipo:["Cliente"],
        estado:["A"], 
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

   registrar(){
        if(!this.tcaptcha){this.advertencia=true;}
        let datos=this.formUsuarios.value;

        if(this.formUsuarios.value.sexo == null){
            this.elegirSexo=true;
        }        
        else if (!this.formUsuarios.valid || this.existeEmail || this.advertencia){        
          alert("Datos Incorrectos o Faltan Datos");
        } 
        else {
              this.apiService.AgregarCliente(datos).subscribe(r=>{  
                if(r.exito){
                    
                }      
                 alert(r.mensaje); 
                 this.router.navigate(['/Inicio']);          
            });
        }
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

   resolved(captchaResponse) {
    this.tcaptcha=captchaResponse;
    if(!this.tcaptcha || this.tcaptcha===null){
        this.advertencia=true;
    }
    else{
      this.advertencia=false;
    }
  }


}
