import { Component, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { NgTemplateOutlet } from '@angular/common';
import { BottomMenuManagerService } from '../services/bottom-menu-manager.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgTemplateOutlet],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  public tokenService: SignInService = inject(SignInService);
  private menuService = inject(BottomMenuManagerService);
  @Input()
  navigationTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.menuService.currentMenu.subscribe({
      next: (value) => {
        console.log(value);
        
        this.navigationTemplate = value as TemplateRef<any>;
      },
    });
  }
}
