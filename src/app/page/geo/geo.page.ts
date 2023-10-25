import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.page.html',
  styleUrls: ['./geo.page.scss']
})

export class GeoPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.obtenerUbicacionActual();
  }

  async obtenerUbicacionActual() {
    const coordenadas = await Geolocation.getCurrentPosition();
    const latitud = coordenadas.coords.latitude;
    const longitud = coordenadas.coords.longitude;
  
    console.log(`Latitud: ${latitud}, Longitud: ${longitud}`);
  }
 
}
