import { Component, inject, OnInit } from '@angular/core';
import { ExampleService } from './example.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'playground';
  private ex = inject(ExampleService);
  store$ = this.ex.store$;
  setFoo = this.ex.getState().setFoo;

  ngOnInit(): void {
    this.store$.subscribe((state) => console.log({ state }));
  }

  update() {
    this.setFoo('updated value');
  }
}
