import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'isActivated',
  standalone: true,
})
export class IsActivatedPipe implements PipeTransform {
  transform(fragment: string | null, href: string) {
    const [, route] = href.split('#');
    return fragment === route;
  }
}

@Component({
  standalone: true,
  selector: 'app-nav-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatListModule, IsActivatedPipe],
  template: `<mat-nav-list>
    <a
      mat-list-item
      [href]="item.href"
      *ngFor="let item of list; trackBy: trackList"
      [activated]="fragment$ | async | isActivated : item.href"
    >
      {{ item.title }}
    </a>
  </mat-nav-list>`,
})
export class NavListComponent {
  private route = inject(ActivatedRoute);
  fragment$ = this.route.fragment;

  list = [
    {
      title: 'Overview',
      href: '#overview',
    },
    {
      title: 'Getting Started',
      href: '#getting-started',
    },
    {
      title: 'Usage',
      href: '#usage',
    },
    {
      title: 'Recipes',
      href: '#recipes',
    },
  ];

  trackList(index: number, item: any) {
    return item.title;
  }
}
