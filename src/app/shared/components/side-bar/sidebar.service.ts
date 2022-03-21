import { Injectable } from '@angular/core';
@Injectable()
export class SidebarService {
  visible = false;
  isVisible(isVisible: boolean) {
    this.visible = isVisible;
    console.log('this.loader', this.visible);
  }
}
