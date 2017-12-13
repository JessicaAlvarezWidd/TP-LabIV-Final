import { Component, OnInit,Input, Output, EventEmitter, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 
import { ApiserviceService } from '../../apiservice/apiservice.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-alta-locales',
  templateUrl: './alta-locales.component.html',
  styleUrls: ['./alta-locales.component.css']
})
export class AltaLocalesComponent implements OnInit {

  @ViewChild("search")  public searchElementRef: ElementRef;
  @Output() public eventoLocal=new EventEmitter<any>();
  @Output() public eventocancelar=new EventEmitter<any>();
  public productosSel:Array<any>=[];
  public empleadosSel:Array<any>=[];
  public encargadosSel:Array<any>=[];
  public formLocal:FormGroup;
  public elegirEncargado:boolean=false;
  public elegirEmpleado:boolean=false;
  public elegirProductos:boolean=false;
  public datoLugar;

  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';
  imageSrc2: string = '';
  imageSrc3: string = '';
  inputAfectado: string = '';

  fotoSubida;
  fotoSubida2;
  fotoSubida3;

  constructor(public formBuilder: FormBuilder, private apiService: ApiserviceService,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

    this.traerProductos();
    this.traerEmpleados();
    this.formLocal = this.formBuilder.group({
      direccion: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s|,|.|º|ª]+$')])],
      encargado: [null, Validators.compose([Validators.required])],
      file1: ['', Validators.compose([])],
      file2: ['', Validators.compose([])],
      file3: ['', Validators.compose([])]

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


  cancelar(){
    this.eventocancelar.emit(true);
  }

  resetForms(){
    this.formLocal.reset();
    this.productosSel=[];
    this.empleadosSel=[];
    this.encargadosSel=[];
    this.elegirEncargado=false;
    this.elegirEmpleado=false;
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

  traerEmpleados(){
    
    this.apiService.TraerEmpleadosDisponibles().subscribe(e=>{
          e.forEach(e => {
              if(e.tipo=="Encargado"){
                this.encargadosSel.push(e);
              }
              else if(e.tipo=="Empleado"){
                let datos={nombre:e.nombre,apellido:e.apellido, value:e.id_emp, checked:false};
                this.empleadosSel.push(datos);
              }
          });
    });
  }

  opcionesSleccionadas(opcion):Array<any> { 
    
    let datos:Array<any>=[];
    switch(opcion){
      case "p":
                  this.productosSel.forEach(p => {
                       if(p.checked){
                         datos.push({id:p.value});
                       }
                    });
                    break;
      case "e":
                this.empleadosSel.forEach(e => {
                       if(e.checked){
                         datos.push({id:e.value});
                       }
                    });
                    break;                             
    }

    return datos;
  }

  agregarLocal(){
        

        let emp:Array<any>=this.opcionesSleccionadas("e");
        let p:Array<any>=this.opcionesSleccionadas("p");

        if(this.formLocal.value.encargado == null){
            this.elegirEncargado=true;
        }
        if(emp.length < 2){
            this.elegirEmpleado=true;
        }        
        if(p.length == 0){
            this.elegirProductos=true;
        }              
        if (!this.formLocal.valid || this.elegirProductos ||  this.elegirEmpleado || this.elegirEncargado){        
          alert("Datos Incorrectos o Faltan Datos");
        } 
        else {
             
            let datos=new FormData();
            datos.append("direccion",this.formLocal.value.direccion);
            datos.append("encargado",this.formLocal.value.encargado);
            datos.append("empleados",JSON.stringify(emp));
            datos.append("productos",JSON.stringify(p));
	    datos.append('foto1', this.fotoSubida);
	    datos.append('foto2', this.fotoSubida2);
	    datos.append('foto3', this.fotoSubida3);			

            this.resetForms();
            this.eventoLocal.emit(datos);
        }
  }

  verificarCantEmpleados(){
     this.elegirEmpleado=true;
     let cantEmpleadosSeleccionados=this.opcionesSleccionadas("e");
     if(cantEmpleadosSeleccionados.length >= 2){
          this.elegirEmpleado=false;
     }
  }

  verificarCantProd(){
     this.elegirProductos=true;
     let cantProdSeleccionadas=this.opcionesSleccionadas("p");
     if(cantProdSeleccionadas.length > 0){
          this.elegirProductos=false;
     }
  }


  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;
    this.inputAfectado = e.srcElement.id;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    var reader = e.target;

    switch (parseInt(this.inputAfectado.substring(this.inputAfectado.length - 1, this.inputAfectado.length))) {
      case 1:
        this.fotoSubida = (<HTMLInputElement>document.getElementById('file1')).files[0];
        if (!this.ValidarFoto(this.fotoSubida)) {
          alert("Cambie la imagen 1, solo se permiten imagenes de tamanio inferior a 1 MB");
          this.fotoSubida = undefined;
          return;
        } else {
          this.imageSrc = reader.result;
        }
        break;
      case 2:
        this.fotoSubida2 = (<HTMLInputElement>document.getElementById('file2')).files[0];
        if (!this.ValidarFoto(this.fotoSubida2)) {
          alert("Cambie la imagen 2, solo se permiten imagenes de tamanio inferior a 1 MB");
          this.fotoSubida2 = undefined;
          return;
        } else {
          this.imageSrc2 = reader.result;
        }

        break;
      case 3:
        this.fotoSubida3 = (<HTMLInputElement>document.getElementById('file3')).files[0];
        if (!this.ValidarFoto(this.fotoSubida3)) {
          alert("Cambie la imagen 3, solo se permiten imagenes de tamanio inferior a 1 MB");
          this.fotoSubida3 = undefined;
          return;
        } else {
          this.imageSrc3 = reader.result;
        }

        break;
    }
    this.loaded = true;
  }

  ValidarFoto(foto) {
    console.log("valido foto");
    if (foto != undefined) {
      if (foto.size > (1024 * 1024)) {
        return false;
      }
    }
    return true;
  }

}
