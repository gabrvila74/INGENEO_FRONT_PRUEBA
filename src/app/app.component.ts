import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IngeneoFRONT';
  tipoProductos: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.http.get('https://localhost:44305/api/TipoProducto').subscribe({
    //  next: response => this.tipoProductos = response,
    //  error: error => console.log('error',error.message)
    //  //complete: () => console.log('Request has completed')
    //})
  }

}
