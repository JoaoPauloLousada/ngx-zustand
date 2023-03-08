import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbarModule, MatIconModule],
  template: `<mat-toolbar color="primary">
    <button
      mat-icon-button
      class="flex items-center"
      (click)="menuClick.emit(true)"
    >
      <mat-icon>menu</mat-icon>
    </button>
    <span class="ml-4">Ngx Zustand</span>
  </mat-toolbar>`,
})
export class ToolbarComponent {
  @Output() menuClick = new EventEmitter<boolean>();
}
