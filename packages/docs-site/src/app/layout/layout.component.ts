import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from './toolbar.component';
import { NavListComponent } from './nav-list.component';
import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    LayoutModule,
    ToolbarComponent,
    NavListComponent,
  ],
  template: `
    <app-toolbar (menuClick)="drawer.toggle()" class="sticky top-0" />
    <mat-drawer-container class="drawer-container" *ngIf="vm$ | async as vm">
      <mat-drawer
        #drawer
        class="w-80"
        [mode]="vm.smScreen.matches ? 'over' : 'side'"
        [opened]="vm.opened"
      >
        <app-nav-list (itemClicked)="vm.smScreen.matches && drawer.close()" />
      </mat-drawer>
      <mat-drawer-content class="scroll-smooth">
        <div class="px-4 py-8 max-w-3xl mx-auto">
          <ng-content />
        </div>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    `
      .drawer-container {
        height: calc(100vh - 64px);
        @media screen and (max-width: 600px) {
          height: calc(100vh - 56px);
        }
      }
    `,
  ],
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChild('drawer') drawer!: MatDrawer;
  smScreen$ = this.breakpointObserver.observe([Breakpoints.XSmall]);
  opened$ = this.smScreen$.pipe(map(({ matches }) => !matches));
  vm$ = combineLatest({
    smScreen: this.smScreen$,
    opened: this.opened$,
  });
}
