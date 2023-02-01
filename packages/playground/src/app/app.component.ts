import { Component, inject, OnInit } from '@angular/core';
import { ExampleService } from 'ngx-zustand';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'playground';
  private ex = inject(ExampleService);

  ngOnInit(): void {
    // eslint-disable-next-line no-constant-condition
    if (false) console.log('ex', this.ex);
  }
}
