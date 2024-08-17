import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { BottomMenuManagerService } from '../../core/services/bottom-menu-manager.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stop-point-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stop-point-info.component.html',
  styleUrl: './stop-point-info.component.scss',
})
export class StopPointInfoComponent {
  private menuButtonService = inject(BottomMenuManagerService);

  @ViewChild('stopPointInfo') menuOptions!: TemplateRef<any>;

  ngAfterViewInit(): void {
    this.menuButtonService.setMenuOption(this.menuOptions);
  }
}
