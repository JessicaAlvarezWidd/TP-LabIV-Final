import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }
  title: string = 'My first AGM project';
  lat = -34.6623101;
  lng= -58.3668938;

  
  ngOnInit() {
    
  }

}
