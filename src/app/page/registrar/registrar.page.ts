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

    var usuario = [{
      nombreUsuario:this.usuario,
      contrasena:this.contrasena
    }];

    this.storage.guargarUsuario(usuario);
    this.helper.showAlert("Usuario registrado correctamente.","Información");
    
  }

}
