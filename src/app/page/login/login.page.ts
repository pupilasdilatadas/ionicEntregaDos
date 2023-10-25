import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';
import { StorageService } from 'src/app/service/storage.service';



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
    private storage:StorageService) { }

  ngOnInit() {
  }

  async iniciarSesion() {
    const usuarioIngresado = [
      { nombreUsuario: this.nombreUsuario, contrasena: this.contrasena }
    ];
      
    const data = await this.storage.obtenerUsuario();

    for (let i = 0; i < data.length; i++) {
      const elemento = data[i];
  
      if (
        elemento.nombreUsuario === usuarioIngresado[0].nombreUsuario &&
        elemento.contrasena === usuarioIngresado[0].contrasena
      ) {
        console.log("Iniciaste seisón!");
        this.router.navigate(['/menu']);
        return;
      }
    }
  
    console.log("No hay usuario1");
  }
  
  

  
  
}