import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ComponentsModule} from '@components/components.module';
import {MessageModule} from '@message/message.module';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ComponentsModule, MessageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
