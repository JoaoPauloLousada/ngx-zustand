import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleService } from './example.service';

@NgModule({
  imports: [CommonModule],
  providers: [ExampleService],
})
export class CoreModule {}
