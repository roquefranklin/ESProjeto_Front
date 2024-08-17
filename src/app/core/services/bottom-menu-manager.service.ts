import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BottomMenuManagerService {
  private menuRef: TemplateRef<any> | null = null;

  public currentMenu: BehaviorSubject<TemplateRef<any> | null> =
    new BehaviorSubject<TemplateRef<any> | null>(null);

  public setMenuOption(templateRef: TemplateRef<any>) {
    this.menuRef = templateRef;
    this.currentMenu.next(this.menuRef);
  }

  constructor() {}
}
