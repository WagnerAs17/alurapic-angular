import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PhotosModule} from './photos/photos.module';
import {AppRoutingModule} from './app.routing.module';
import {ErrorsModule} from './errors/errors.module';
import {CoreModule} from './core/core.module';


// se queremos carregar um módulo sobre demanda, 7
//entao ele não pode ser importado no app.module.
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PhotosModule,
    ErrorsModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
