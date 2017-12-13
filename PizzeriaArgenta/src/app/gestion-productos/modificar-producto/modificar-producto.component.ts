import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice/apiservice.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  @Input() producto;

  @Output() public eventoModificar = new EventEmitter<any>();
  @Output() public eventCancelar = new EventEmitter<any>();
  public formProductos: FormGroup;

  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';

  constructor(public formBuilder: FormBuilder, private apiService: ApiserviceService) {

    this.formProductos = this.formBuilder.group({
      nombre: [null, Validators.compose([Validators.minLength(2), Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]*$'), Validators.required])],
      precio: [null, Validators.compose([Validators.minLength(1), Validators.pattern('[0-9]+([.][0-9]{1,2})?$'), Validators.required])],
      file1: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      file2: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      file3: ['', Validators.compose([Validators.maxLength(10), Validators.required])]
    });


  }

  ngOnInit() {

  }

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';
  imageSrc2: string = '';
  imageSrc3: string = '';
  inputAfectado: string = '';
  idProductoAmodificar;

  ngOnChanges() {    
    this.imageSrc = this.producto.foto1;
    this.imageSrc2 = this.producto.foto2;
    this.imageSrc3 = this.producto.foto3;
    this.idProductoAmodificar = this.producto.id_producto;
  }

  cancelar() {
    this.eventCancelar.emit(false);
  }

  eventoProducto() {

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

  modificarProducto() {

    console.log("empiezo a modificar");
    var datos = new FormData();

    var fotoSubida = (<HTMLInputElement>document.getElementById('file1')).files[0];
    var fotoSubida2 = (<HTMLInputElement>document.getElementById('file2')).files[0];
    var fotoSubida3 = (<HTMLInputElement>document.getElementById('file3')).files[0];

    if (!this.ValidarFoto(fotoSubida2) || !this.ValidarFoto(fotoSubida) || !this.ValidarFoto(fotoSubida3)) {
      alert("Cambie la imagen, solo se permiten imagenes de tamanio inferior a 1 MB");
    }
    if (!this.formProductos.controls.nombre.valid || !this.formProductos.controls.precio.valid){        
          alert("Datos Incorrectos o Faltan Datos");
    }  
    else {
      datos.append('id_producto', this.idProductoAmodificar);
      datos.append('nombre', this.formProductos.value.nombre);
      datos.append('precio', this.formProductos.value.precio);

      if (fotoSubida != undefined) {
        datos.append('foto1', fotoSubida);
      }else{
        datos.append('foto1',"NO-CAMBIA");
      }

      if (fotoSubida2 != undefined) {
        datos.append('foto2', fotoSubida2);
      }else{
        datos.append('foto2',"NO-CAMBIA");
      }

      if (fotoSubida3 != undefined) {
        datos.append('foto3', fotoSubida3);
      }else{
        datos.append('foto3',"NO-CAMBIA");
      }
      

      this.eventoModificar.emit(datos);
    }
  }

  ValidarFoto(foto) {
    if (foto != undefined) {
      if (foto.size > (1024 * 1024)) {
        return false;
      }
    }
    return true;
  }


}
