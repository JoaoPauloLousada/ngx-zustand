import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';

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
    <span class="ml-4">Ngx-zustand</span>
    <div class="ml-auto">
      <a
        mat-button
        href="https://github.com/JoaoPauloLousada/ngx-zustand"
        target="_blank"
        class="flex items-center gap-1"
      >
        <mat-icon svgIcon="github" />
        <span class="font-normal text-base">GitHub</span>
      </a>
    </div>
  </mat-toolbar>`,
})
export class ToolbarComponent {
  private iconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  @Output() menuClick = new EventEmitter<boolean>();

  constructor() {
    this.iconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/icons/github.svg'
      )
    );
  }
}
