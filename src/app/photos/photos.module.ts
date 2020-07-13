import {NgModule} from '@angular/core';

import {PhotoListModule} from './photo-list/photo-list.module';
import {PhotoModule} from './photo/photo.module';
import {PhotoFormModule} from './photo-form/photo-form.module';
import {PhotoDetailsModule} from './photo-details/photo-details.module';
import { RouterModule } from '@angular/router';

@NgModule({
    exports:[],
    imports:[
        PhotoListModule,
        PhotoModule,
        PhotoFormModule,
        PhotoDetailsModule
    ]
    
})
export class PhotosModule{}