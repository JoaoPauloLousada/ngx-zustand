import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

@Component({
  standalone: true,
  imports: [HttpClientModule, RouterModule, MarkdownModule, LayoutComponent],
  selector: 'app-root',
  template: ` <app-layout>
    <div id="overview" class="pt-8">
      <markdown lineNumbers [start]="5" src="/assets/overview.md" />
    </div>
    <div id="getting-started" class="pt-8">
      <markdown lineNumbers [start]="5" src="/assets/installation.md" />
    </div>
    <div id="usage" class="pt-8">
      <markdown ngPreserveWhitespaces src="/assets/usage.md" />
    </div>
    <div id="recipes" class="pt-8">
      <markdown ngPreserveWhitespaces src="/assets/recipes.md" />
    </div>
  </app-layout>`,
  styles: [],
})
export class AppComponent {
  title = 'docs-site';
}
