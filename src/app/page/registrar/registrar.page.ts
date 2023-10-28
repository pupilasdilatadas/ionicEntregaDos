import { Component, OnInit } from '@angular/core';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/service/helper.service';
import { LocationService } from 'src/app/service/location.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  usuario:string = '';
  contrasena:string = '';
  rut:string = '';

  regiones:Region[]=[];
  comunas:Comuna[]=[];

  regionSel:number = 0;
  comunaSel:number = 0;
  seleccionComuna:boolean = true;

  constructor(
              private storage:StorageService,
              private helper:HelperService,
              private locationService:LocationService
              ) { }

  ngOnInit() {
    this.cargarRegion();
  }

  //REGIÓN Y COMUNA FUNCIONES

  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }

  //REGISTRO DE USUARIO FUNCIÓN

  registro(){
    if (this.usuario == '') {
      this.helper.showAlert("Debe ingresar un usuario","Error");
      return;
    }
    if (this.contrasena == '') {
      this.helper.showAlert("Debe ingresar una contraseña","Error");
      return;
    }
    if (this.rut == '') {
      this.helper.showAlert("Debe ingresar su rut!","Error");
      return;
    }

    const regionSeleccionada = this.regiones.find(region => region.id === this.regionSel);
    const nombreRegion = regionSeleccionada ? regionSeleccionada.nombre : '';

    const comunaSeleccionada = this.comunas.find(comuna => comuna.id === this.comunaSel);
    const nombreComuna = comunaSeleccionada ? comunaSeleccionada.nombre : '';

    var usuario = [{
      nombreUsuario:this.usuario,
      contrasena:this.contrasena,
      rut:this.rut,
      region: nombreRegion,
      comuna: nombreComuna
    }];

    this.usuario = '';
    this.contrasena = '';
    this.rut = '';
    this.regionSel = 0;
    this.comunaSel = 0;
    this.seleccionComuna = true; 

    this.storage.guargarUsuario(usuario);
    this.helper.showAlert("Usuario registrado correctamente.","Información");
    
  }

}
