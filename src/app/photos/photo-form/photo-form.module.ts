import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {PhotoFormComponent} from './photo-form.component';
import { ValidatorMessageModule } from 'src/app/shared/validatorMessage/validatorMessage.module';
import { RouterModule } from '@angular/router';
import { PhotoModule } from '../photo/photo.module';
import {ImmediateClickModule} from '../../shared/direticves/imediate-click/immediate-click.module'

@NgModule({
    declarations: [
        PhotoFormComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        ValidatorMessageModule,
        RouterModule,
        PhotoModule,
        ImmediateClickModule
    ]
})
export class PhotoFormModule{

}