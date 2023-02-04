import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterPageComponent } from './counter-page/counter-page.component';
import { TodoPageComponent } from './todo-page/todo-page.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CounterPageComponent, TodoPageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
