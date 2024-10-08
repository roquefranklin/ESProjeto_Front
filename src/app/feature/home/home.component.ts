import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { BottomMenuManagerService } from '../../core/services/bottom-menu-manager.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private menuButtonService = inject(BottomMenuManagerService);

  @ViewChild('homeMenuButtons') menuOptions!: TemplateRef<any>;

  ngAfterViewInit(): void {
    this.menuButtonService.setMenuOption(this.menuOptions);
  }
}
