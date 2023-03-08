import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from './toolbar.component';
import { NavListComponent } from './nav-list.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ToolbarComponent,
    NavListComponent,
  ],
  template: `<app-toolbar (menuClick)="drawer.toggle()" />
    <mat-drawer-container class="h-screen">
      <mat-drawer #drawer class="w-80" mode="side" opened="true">
        <app-nav-list />
      </mat-drawer>
      <mat-drawer-content class="scroll-smooth">
        <div class="px-4 py-8 max-w-3xl mx-auto">
          <ng-content />
        </div>
      </mat-drawer-content>
    </mat-drawer-container>`,
  styles: [],
})
export class LayoutComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
}
