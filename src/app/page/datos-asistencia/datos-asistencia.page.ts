import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-datos-asistencia',
  templateUrl: './datos-asistencia.page.html',
  styleUrls: ['./datos-asistencia.page.scss'],
})
export class DatosAsistenciaPage implements OnInit {

  alumno: string = '';
  dia: string = '';
  hora: string = '';
  latitud: string = '';
  longitud: string = '';
  profesor: string = '';
  rutAlumno: string = '';
  sala: string = '';
  imagenes:any[]=[];

  constructor(private storage:StorageService) { }

  ngOnInit() {
    defineCustomElements(window);
  }

  async ionViewWillEnter(){
    let datos = await this.conseguirDatosAsistencia();
    this.alumno=datos.alumno;
    this.dia=datos.dia;
    this.hora=datos.hora;
    this.latitud=datos.latitudAlumno;
    this.longitud=datos.longitudAlumno;
    this.profesor=datos.nombreProfesor;
    this.rutAlumno=datos.rutAlumno;
    this.sala=datos.sala;
  }

  async conseguirDatosAsistencia(){
    let data = await this.storage.conseguirUltimaAsistencia();
    return data;
  }

  async takePhoto(){
    var cSourse = CameraSource.Prompt;
    // if ((await Camera.checkPermissions()).camera == 'granted') {
      const image = await Camera.getPhoto(
        {
          resultType:CameraResultType.Uri,
          quality:100,
          height:1024,
          width:1024,
          source:cSourse,
          presentationStyle:'popover',
          promptLabelCancel:"Cancelar",
          promptLabelHeader:"Seleccione",
          promptLabelPhoto:"Desde la galeria",
          promptLabelPicture:"Desde la camara"
        }
        );
        if (image.webPath) {
          var blob = (await fetch(image.webPath)).blob();
          this.imagenes=[{fname:'foto.'+ image.format,src:image.webPath,file:blob}];
        }
        console.log("IMAGENES GUARDADAS ===> ", this.imagenes);
    // }
  }

}
