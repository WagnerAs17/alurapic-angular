import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {UserService} from '../user/user.service';
import { environment } from '../../../environments/environment';

const API = environment.API_URL;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor
  (
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(userName:string, password:string){

    //pipe permite executar um código arbitrario exemplo: filtro, timeout etc.
    return this.http
    .post(
      API + 'user/login',
      {userName, password}, 
      {observe: 'response'}
    )
    .pipe(tap(res => {
        const authToken: string = res.headers.get('x-access-token');

        this.userService.setToken(authToken);
        console.log(`User: ${userName} with token: ${authToken}`);
    }));
  }
}
