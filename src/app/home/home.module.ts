import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SignInComponent } from './signin/signin.component';
import {ValidatorMessageModule} from '../shared/validatorMessage/validatorMessage.module';
import {SingUpComponent} from './singup/singup.component';
import {HomeComponent} from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SingUpService } from './singup/singup.service';

@NgModule({
    declarations: [
        SignInComponent,
        SingUpComponent,
        HomeComponent
    ],
    imports:[
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ValidatorMessageModule,
        RouterModule,
        HomeRoutingModule
    ],
    providers:[
        SingUpService
        //declarando no modulo, definimos que quem está declarado nesse modulo,
        //vai ter acesso a esse serviço,
        //Se no decorator definirmos como root, estamos afirmando que esse serviço,
        //terá o escopo global,ou seja, qualquer modulo da aplicação pode utilizar
    ]

})
export class HomeModule{}