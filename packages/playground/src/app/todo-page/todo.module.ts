import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TodoPageComponent } from './todo-page.component';

@NgModule({
  declarations: [TodoPageComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [TodoPageComponent],
})
export class TodoModule {}
