import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/service/helper.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  rut:string = '';
  contrasenaRecuperada: string | null = null;

  constructor(
              private storage:StorageService,
              private helper:HelperService
              ) { }

  ngOnInit() {
  }

  async recuperarContrasena() {
    if (this.rut === '') {
      this.helper.showAlert('Por favor, ingresa tu RUT',"INFORMACIÓN!")
      return;
    }

    // Llama a la función de recuperación de contraseña del servicio
    this.contrasenaRecuperada = await this.storage.recuperarContrasena(this.rut);

    if (this.contrasenaRecuperada === null) {
      this.helper.showAlert('No se encontró un usuario con ese RUT',"INFORMACIÓN!");
    } else {
      this.helper.showAlert(`Tu contraseña es: ${this.contrasenaRecuperada}`, 'CONTRASEÑA RECUPERADA!');
      this.rut = '';
    }
  }


}
