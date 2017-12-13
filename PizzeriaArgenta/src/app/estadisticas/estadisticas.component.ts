import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [" "];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;  

  public barChartData:any[] = [ ];

  public pieChartLabels:string[] = ["hhh"];
  public pieChartData:number[]  = [0];
  public pieChartType:string = 'pie';
  public doughnutChartLabels:string[] = ["s"];
  public doughnutChartData:number[] = [0];
  public doughnutChartType:string = 'doughnut';
  public e1:boolean=false;
  public e2:boolean=false;
  public e3:boolean=false;
  public e4:boolean=false;
  public e5:boolean=false;
  public e6:boolean=false;
  public ventasLocal:Observable<any>;
  public ventasLocalE:Observable<any>;
  public ventasCliente:Observable<any>;
  public importesPorDiaLocales:Observable<any>;

  constructor(private apiService:ApiserviceService) { 
    this.VentasporLocal();
  }


  VentasporLocal(){

   this.pieChartData=[];
   this.pieChartLabels=[];

    this.apiService.traerVentasPorLocales().subscribe(r=>{
          this.ventasLocal=r;
          this.ventasLocal.forEach(l => {
              this.pieChartData.push(l.Total);
              this.pieChartLabels.push(l.direccion);
          });

          this.e1=true;
    });
  }

  VentasporLYE(){
   this.apiService.traerVentasPorLocalesYEmpleado().subscribe(d=>{
              this.ventasLocalE=d;
              console.log(this.ventasLocalE);
          });
          this.e2=true;
  }

   importesPorDia(){
    this.barChartLabels=[];
    this.barChartData = []
    let totales:Array<any>=[];
    this.apiService.traerImportesPorDia().subscribe(d=>{
                this.importesPorDiaLocales=d;
                this.importesPorDiaLocales.forEach(d => {
                this.barChartLabels.push(d.fecha);               
                
                totales.push(d.Total);
                                       
              });   
             this.barChartData.push({data:totales,label:"Fechas"});  
            console.log(this.barChartData);        
            this.e4=true;
      });
  }

  clientesCompras(){
    this.doughnutChartData=[];
    this.doughnutChartLabels=[];

    this.apiService.traerVentasCliente().subscribe(r=>{
          this.ventasCliente=r;
          this.ventasCliente.forEach(c => {
              this.doughnutChartData.push(c.Total);
              this.doughnutChartLabels.push(c.nombre+" "+c.apellido);
          });
          console.log( this.doughnutChartData);
          console.log( this.doughnutChartLabels);
          this.e3=true;
    });
  }

  queveo(queestadistica){

    switch(queestadistica){
      case "e1":
                this.VentasporLocal();
                this.e2=false;
                this.e3=false;
                this.e4=false;
                this.e5=false;
                this.e6=false;
                break;
    case "e2":
                this.VentasporLYE();
                this.e1=false;
                this.e3=false;
                this.e4=false;
                this.e5=false;
                this.e6=false;
                break; 
    case "e3":
                this.clientesCompras();
                this.e1=false;
                this.e2=false;
                this.e4=false;
                this.e5=false;
                this.e6=false;
                break; 
    case "e4":
                this.importesPorDia();
                this.e1=false;
                this.e2=false;
                this.e3=false;
                this.e5=false;
                this.e6=false;
                break;  
    case "e5":
                this.e1=false;
                this.e2=false;
                this.e3=false;
                this.e4=false;
                this.e5=true;
                this.e6=false;
                break;  
    case "e6":
                this.e1=false;
                this.e2=false;
                this.e3=false;
                this.e4=false;
                this.e5=false;
                this.e6=true;
                break;                        

    }
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;

  }

  ngOnInit() {
  }
 
}
