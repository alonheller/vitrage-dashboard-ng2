import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() { }

  login(user:string, password:string) {
    console.log('LOGIN service user:)', user);
    console.log('LOGIN service password:)', password);
  }

}
