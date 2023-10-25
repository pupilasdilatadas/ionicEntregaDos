import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/service/helper.service';
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

  constructor(
              private storage:StorageService,
              private helper:HelperService
              ) { }

  ngOnInit() {
  }

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

    var usuario = [{
      nombreUsuario:this.usuario,
      contrasena:this.contrasena,
      rut:this.rut
    }];

    this.storage.guargarUsuario(usuario);
    this.helper.showAlert("Usuario registrado correctamente.","Información");
    
  }

}
