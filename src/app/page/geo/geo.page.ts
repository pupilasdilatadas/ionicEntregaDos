import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.page.html',
  styleUrls: ['./geo.page.scss']
})

export class GeoPage implements OnInit {

  latitud: number= 0;;
  longitud: number= 0;;

  constructor() { }

  ngOnInit() {
    this.obtenerUbicacionActual();
  }

  async obtenerUbicacionActual() {
    const coordenadas = await Geolocation.getCurrentPosition();
    this.latitud = coordenadas.coords.latitude;
    this.longitud = coordenadas.coords.longitude;
  
    console.log(`Latitud: ${this.latitud}, Longitud: ${this.longitud}`);
  }
 
}
