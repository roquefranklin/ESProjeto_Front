import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NavBarComponent,
    RouterModule,
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent {
  constructor(public router: Router) {}
}
