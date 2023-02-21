import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CounterPageComponent } from './counter-page/counter-page.component';
import { TodoModule } from './todo-page/todo.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CounterPageComponent, TodoModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
