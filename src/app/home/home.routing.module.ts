import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';
import {SignInComponent} from './signin/signin.component';
import {SingUpComponent} from './singup/singup.component';
import {LoginAuth} from '../core/auth/login.guard';


const routes: Routes = [
    {
        path: '', 
        component: HomeComponent,
        canActivate: [LoginAuth],
        children:[
            {
                path: '', 
                component: SignInComponent,
                data:{
                    tile: 'Sign in'
                }
            },
            {
                path: 'singup', 
                component: SingUpComponent,
                data:{
                    title: 'Sing up'
                }
            }
        ]
    }
];


@NgModule({
    //unico que pode usar o o forRoot é o modulo principal da aplicação
    // como queremos realizar o lazy loading usamos o forChild
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule{

}