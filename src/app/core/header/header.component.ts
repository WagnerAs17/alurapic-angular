import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent{
    
    //Toda vez que tivermos um observable é uma boa pratica usar $ para indicar que é um observable
    user$: Observable<User>;

    constructor
    (
        private userService: UserService,
        private router: Router
    )
    {
        this.user$ = this.userService.getUser();
    }

    logout(){
        this.userService.logout();
        this.router.navigate(['']);
    }

}