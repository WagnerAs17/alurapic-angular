import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {PhotoDetailsComponent} from './photo-details.component';
import {PhotoModule} from '../photo/photo.module';
import {PhotoCommentsComponent} from './photo-comments/photo-comments.component';
import {ValidatorMessageModule} from 'src/app/shared/validatorMessage/validatorMessage.module';
import {PhotoOwnerOnlyDirective} from './photo-owner-only/photo-owner-only.directive';
import {ShowIfLoggedModule} from '../../shared/direticves/show-if-logged/Show-if-logged.module';


@NgModule({
    declarations: [
        PhotoDetailsComponent,
        PhotoCommentsComponent,
        PhotoOwnerOnlyDirective
    ],
    exports: [
        PhotoDetailsComponent,
        PhotoCommentsComponent
    ],
    imports: [
        CommonModule,
        PhotoModule,
        RouterModule,
        ReactiveFormsModule,
        ValidatorMessageModule,
        ShowIfLoggedModule
    ]
})
export class PhotoDetailsModule{

}