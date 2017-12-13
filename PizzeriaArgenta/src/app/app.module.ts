import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ApiserviceService } from './apiservice/apiservice.service';
import { FbserviceService } from './fbservice/fbservice.service';

import { AgmCoreModule } from "@agm/core";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AppComponent } from './app.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { AltaUsuariosComponent } from './gestion-usuarios/alta-usuarios/alta-usuarios.component';
import { ModificacionUsuariosComponent } from './gestion-usuarios/modificacion-usuarios/modificacion-usuarios.component';
import { UsuarioComponent } from './clases/usuario/usuario/usuario.component';
import { EmpleadoComponent } from './clases/empleado/empleado/empleado.component';
import { ClienteComponent } from './clases/cliente/cliente/cliente.component';
import { OfertaComponent } from './clases/oferta/oferta/oferta.component';
import { LocalComponent } from './clases/local/local/local.component';
import { GestionLocalesComponent } from './gestion-locales/gestion-locales.component';
import { AltaLocalesComponent } from './gestion-locales/alta-locales/alta-locales.component';
import { ModificacionLocalesComponent } from './gestion-locales/modificacion-locales/modificacion-locales.component';
import { GestionOfertasComponent } from './gestion-ofertas/gestion-ofertas.component';
import { AltaOfertaComponent } from './gestion-ofertas/alta-oferta/alta-oferta.component';
import { ModificacionOfertaComponent } from './gestion-ofertas/modificacion-oferta/modificacion-oferta.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { AltaProductosComponent } from './gestion-productos/alta-productos/alta-productos.component';
import { ModificarProductoComponent } from './gestion-productos/modificar-producto/modificar-producto.component';
import { LoginComponent } from './login/login.component';

import { RecaptchaModule } from 'ng2-recaptcha';
import { JwtModule } from './jwt/jwt.module';
import { AuthService } from './servicio/auth.service';
import { VerificarjwtService } from './servicio/verificarjwt.service';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './clases/pedido/pedido/pedido.component';
import { VerpedidosComponent } from './verpedidos/verpedidos.component';
import { RegistroComponent } from './registro/registro.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

import { ChartsModule } from 'ng2-charts';
import { InicioComponent } from './inicio/inicio.component';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDHf7fC9D7rZCsah2Gl3kytVHKBe1gHJp8",
    authDomain: "pizzeria-60e38.firebaseapp.com",
    databaseURL: "https://pizzeria-60e38.firebaseio.com",
    projectId: "pizzeria-60e38",
    storageBucket: "pizzeria-60e38.appspot.com",
    messagingSenderId: "761207345083"
  }
};

firebase.initializeApp(environment.firebase);


const appRoutes: Routes = [
  { path: 'Inicio', component: InicioComponent },
  { path: 'gestionUsuarios', component: GestionUsuariosComponent },
  { path: 'gestionLocales', component: GestionLocalesComponent },
  { path: 'gestionProductos', component: GestionProductosComponent },
  { path: 'gestionOfertas', component: GestionOfertasComponent },
  { path: 'Estadisticas', component: EstadisticasComponent },
  { path: 'verPedidos', component: VerpedidosComponent },
  { path: 'compraonline', component: PedidosComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'Salir', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,   
    GestionUsuariosComponent,
    AltaUsuariosComponent,
    ModificacionUsuariosComponent,
    UsuarioComponent,
    EmpleadoComponent,
    ClienteComponent,
    LocalComponent,
    GestionLocalesComponent,
    AltaLocalesComponent,
    ModificacionLocalesComponent,
    GestionOfertasComponent,
    AltaOfertaComponent,
    ModificacionOfertaComponent,
    OfertaComponent,
    GestionProductosComponent,
    AltaProductosComponent,
    ModificarProductoComponent,
    LoginComponent,
    PedidosComponent,
    PedidoComponent,
    VerpedidosComponent,
    RegistroComponent,
    EncuestaComponent,
    EstadisticasComponent,
    InicioComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JwtModule,
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RecaptchaModule.forRoot(),
    RouterModule.forRoot(appRoutes),
     AgmCoreModule.forRoot({
      apiKey: "AIzaSyCVfk6OTBqynyObMZH8HOgRh27uKruRW6g",
      libraries: ["places"]
    }),
  ],
  providers: [
    FbserviceService,
    ApiserviceService,AuthService,VerificarjwtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
