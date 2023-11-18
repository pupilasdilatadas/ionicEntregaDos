import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';
import { StorageService } from 'src/app/service/storage.service';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombreUsuario:string = "";
  contrasena:string = "";

  constructor(private router:Router,
    private helper:HelperService,
    private storage:StorageService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  async iniciarSesion() {

    if (this.nombreUsuario == '') {
      this.helper.showAlert("Debe ingresar un usuario","Error");
      return;
    }
    if (this.contrasena == '') {
      this.helper.showAlert("Debe ingresar una contraseña","Error");
      return;
    }

    const usuarioIngresado = [
      { nombreUsuario: this.nombreUsuario, contrasena: this.contrasena }
    ];

    const data = await this.storage.obtenerUsuario();
    let credencialesValidas = false;

    for (let i = 0; i < data.length; i++) {
      const elemento = data[i];
      if (
        elemento.nombreUsuario === usuarioIngresado[0].nombreUsuario &&
        elemento.contrasena === usuarioIngresado[0].contrasena
      ) {
        credencialesValidas = true;
        console.log("Iniciaste seisón!");
        this.storage.guardarUsuarioActivo(elemento);
        this.nombreUsuario = '';
        this.contrasena = '';
        this.authService.login(true);
        this.router.navigate(['/menu']);
        return;
      }
    }
    
    if (!credencialesValidas) {
      this.helper.showAlert("Credenciales no válidas", "Error");
    }
    console.log("No hay usuario1");
  }





}
