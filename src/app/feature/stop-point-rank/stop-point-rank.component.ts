import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { BottomMenuManagerService } from '../../core/services/bottom-menu-manager.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stop-point-rank',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stop-point-rank.component.html',
  styleUrl: './stop-point-rank.component.scss',
})
export class StopPointRankComponent {
  private menuButtonService = inject(BottomMenuManagerService);

  @ViewChild('stopPointRank') menuOptions!: TemplateRef<any>;

  ngAfterViewInit(): void {
    this.menuButtonService.setMenuOption(this.menuOptions);
  }
}
