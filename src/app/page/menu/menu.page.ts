import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { StorageService } from 'src/app/service/storage.service';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private storage:StorageService,private router:Router,private authService: AuthService) { }

  ngOnInit() {
  }

  async handleQrCodeResult(event:any){
    let qrResult = this.extractText(event);
    let usuario = await this.conseguirAlumno();
    this.guardarAsistencia(qrResult,usuario);
    this.router.navigate(['/datos-asistencia']);
  }

  extractText(qrStr:string){
    const regex = /([^:]+):\s*([^,]+)/g;
    const valores = [];
    let match;
    while ((match = regex.exec(qrStr)) !== null) {
      const clave = match[1].trim();
      const valor = match[2].trim();
      valores.push(valor);
    }
    return valores;
  }

  async conseguirAlumno(){
    let usuarioActivo = await this.storage.obtenerUsuarioActivo();
    return usuarioActivo;
  }

  async guardarAsistencia(clase:any[],alumno:any){
    const coordenadas = await Geolocation.getCurrentPosition();
    let latitud = coordenadas.coords.latitude;
    let longitud = coordenadas.coords.longitude;
    let asistencia = [{
      nombreProfesor: clase[0],
      hora: clase[1],
      sala: clase[2],
      dia: clase[3],
      alumno: alumno.nombreUsuario,
      rutAlumno: alumno.rut,
      latitudAlumno: latitud,
      longitudAlumno: longitud
    }];
    this.storage.guardarAsistencia(asistencia);
  }

  salir(){
    this.authService.logout();
  }

}
