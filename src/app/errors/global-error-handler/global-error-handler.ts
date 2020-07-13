import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import * as StackTrace from 'stacktrace-js';

import { UserService } from 'src/app/core/user/user.service';
import {ServerLogService} from './server-log.service';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
    
    constructor(private injector: Injector){}

    handleError(error: any): void {
        const location = this.injector.get(LocationStrategy);

        const userService = this.injector.get(UserService); 

        const serverLogService = this.injector.get(ServerLogService);

        const router = this.injector.get(Router);

        const url = location instanceof PathLocationStrategy ? 
            location.path() : 
            '';
        
        console.log("valor da URL: " + url);
        console.log("Passei pelo handler!");
        const errorMenssage = error.message ? 
            error.message : 
            error.toString();
        
        if(environment.production) router.navigate(['/error']);

        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stackTraceAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');

                serverLogService.log(
                    { 
                        message: errorMenssage, 
                        stack: stackTraceAsString, 
                        url,
                        userName: userService.getUserName()
                    }).subscribe(() => {
                        console.log("Error logger on server")
                    }, error => {
                        console.log(error);
                        console.log("Fail to send error server");
                    });
            });
    }

}