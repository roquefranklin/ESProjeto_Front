import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { BottomMenuManagerService } from '../../core/services/bottom-menu-manager.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stop-point-rating',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stop-point-rating.component.html',
  styleUrl: './stop-point-rating.component.scss',
})
export class StopPointRatingComponent {
  private menuButtonService = inject(BottomMenuManagerService);

  @ViewChild('rateStopPoint') menuOptions!: TemplateRef<any>;

  ngAfterViewInit(): void {
    this.menuButtonService.setMenuOption(this.menuOptions);
  }
}
