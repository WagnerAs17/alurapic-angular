import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {UserService} from '../user/user.service';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class LoginAuth implements CanActivate{

    constructor
    (
        private userService: UserService,
        private router: Router
    ){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>
        {
            if(this.userService.isLogged()){

                this.router.navigate(['user', this.userService.getUserName()])
                return false;
            }
            return true;
        }

}