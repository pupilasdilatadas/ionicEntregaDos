import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Authenticated: boolean = false;
  constructor() { }

  login(state:boolean){
    this.Authenticated = state;
    return true;
  }

  isAuthenticated(): boolean {
    return this.Authenticated;
  }

  logout(){
    this.Authenticated = false;
  }
}
