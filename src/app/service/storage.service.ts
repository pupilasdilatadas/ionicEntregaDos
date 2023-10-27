import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const storageUsuario = 'usuarioData';
const storageUsuarioActivo = 'usuarioDataActivo';
const asistencias = 'asistenciasData';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  async setItem(llave:string,valor:string){
    await Preferences.set({key:llave,value:valor})
  }

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }

  async guargarUsuario(user:any[]){
    var userStorage = await this.obtenerUsuario();

    for (const i of userStorage) {
      if (i) {
        user.push(i);
      }
    }
    this.setItem(storageUsuario,JSON.stringify(user));
  }




  async obtenerUsuario(){
    const storageData = await this.getItem(storageUsuario);

    if (storageData == null) {
      return [];
    }

    const data:any[] = JSON.parse(storageData);

    if (data) {
      return data;
    }
    else{
      return [];
    }
  }


  async recuperarContrasena(rut: string): Promise<string | null> {
    const usuarios = await this.obtenerUsuario();

    const usuario = usuarios.find(user => user.rut === rut);

    if (usuario) {
      return usuario.contrasena;
    } else {
      return null; // El usuario no fue encontrado
    }
  }

  async guardarUsuarioActivo(user:any[]){
    this.setItem(storageUsuarioActivo,JSON.stringify(user));
  }

  async obtenerUsuarioActivo(){
    const storageData = await this.getItem(storageUsuarioActivo);
    if (storageData == null) {
      return [];
    }
    const data:any[] = JSON.parse(storageData);
    if (data) {
      return data;
    }
    else{
      return [];
    }
  }

  async obtenerAsistencias(){
    const storageData = await this.getItem(asistencias);
    if (storageData == null) {
      return [];
    }
    const data:any[] = JSON.parse(storageData);
    if (data) {
      return data;
    }
    else{
      return [];
    }
  }

  async guardarAsistencia(nuevaAsistencia:any[]){
    var userStorage = await this.obtenerAsistencias();

    for (const i of userStorage) {
      if (i) {
        nuevaAsistencia.push(i);
      }
    }
    this.setItem(asistencias,JSON.stringify(nuevaAsistencia));
  }

  async conseguirUltimaAsistencia(){
    const storageData = await this.getItem(asistencias);
    if (storageData) {
      const data:any[] = JSON.parse(storageData);
      return data[0];
    }
  }
}
