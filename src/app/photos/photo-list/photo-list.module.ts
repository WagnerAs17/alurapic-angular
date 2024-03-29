import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PhotoListComponent} from './photo-list.component';
import {FilterByDescription} from './filter-by-decription.pipe';
import {PhotosComponent} from './photos/photos.component';
import {LoadButtonComponent} from './load-button/load-button.component';
import {PhotoModule} from '../photo/photo.module';
import {CardModule} from '../../shared/components/card/card.module';
import {SearchComponent} from './search/search.component';
import {DarkenOnHoverModule} from '../../shared/direticves/darken-on-hover/darken-on-hover.module';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations:[
        PhotoListComponent,
        PhotosComponent,
        LoadButtonComponent,
        FilterByDescription,
        SearchComponent
    ],
    imports:[
        CommonModule,
        PhotoModule,
        CardModule,
        DarkenOnHoverModule,
        RouterModule
    ]
})
export class PhotoListModule{

}