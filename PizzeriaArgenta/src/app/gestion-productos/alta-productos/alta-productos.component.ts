import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html',
  styleUrls: ['./alta-productos.component.css']
})
export class AltaProductosComponent implements OnInit {

  public formProducto: FormGroup;
  @Output() public evento = new EventEmitter<any>();
  @Output() public eventoCancelar = new EventEmitter<any>();

  constructor(public formBuilder: FormBuilder) {

    this.formProducto = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]*$'), Validators.required])],
      precio: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+([.][0-9]{1,2})?$'), Validators.required])],
      file1: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      file2: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      file3: ['', Validators.compose([Validators.maxLength(10), Validators.required])]

    });


  }

  ngOnInit() {
  }

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
        this.imageSrc = reader.result;
        break;
      case 2:
        this.imageSrc2 = reader.result;
        break;
      case 3:
        this.imageSrc3 = reader.result;
        break;
    }

    this.loaded = true;
  }

  agregarProducto() {
    var datos = new FormData();

    var fotoSubida = (<HTMLInputElement>document.getElementById('file1')).files[0];
    var fotoSubida2 = (<HTMLInputElement>document.getElementById('file2')).files[0];
    var fotoSubida3 = (<HTMLInputElement>document.getElementById('file3')).files[0];

    if (!this.ValidarFoto(fotoSubida2) || !this.ValidarFoto(fotoSubida) || !this.ValidarFoto(fotoSubida3)) {
      alert("Cambie la imagen, solo se permiten imagenes de tamanio inferior a 1 MB");
    } 
    if (!this.formProducto.controls.nombre.valid || !this.formProducto.controls.precio.valid){        
          alert("Datos Incorrectos o Faltan Datos");
          console.log(this.formProducto.controls.precio.valid);
          console.log(this.formProducto.controls.nombre.valid);
    } 
    else { 
      console.log("entro alta"); 
      datos.append('nombre', this.formProducto.value.nombre);
      datos.append('precio', this.formProducto.value.precio);
      datos.append('foto1', fotoSubida);
      datos.append('foto2', fotoSubida2);
      datos.append('foto3', fotoSubida3);

      this.evento.emit(datos);
    }
  }

  ValidarFoto(foto) {
    if(foto != undefined){
      if (foto.size > (1024 * 1024)) {
        return false;
      }
    }
    return true;
  }

  cancelar(){
    this.eventoCancelar.emit(true);
  }

}
