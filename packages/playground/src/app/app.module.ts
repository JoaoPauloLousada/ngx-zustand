import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExampleService } from 'ngx-zustand';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule],
  providers: [ExampleService],
  bootstrap: [AppComponent],
})
export class AppModule {}
