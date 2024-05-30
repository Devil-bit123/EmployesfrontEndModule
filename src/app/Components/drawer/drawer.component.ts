import { Component, output } from '@angular/core';
import { Menu } from '../../Interfaces/Menu/menu';
import { MenuService } from '../../Services/Menu/menu.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {

  //  menuItems: Menu[] = [
  //   { name: 'employes', visibilityStatus: false },
  //   { name: 'departments', visibilityStatus: false }
  // ];

  menuItems$ = this.menuService.menuItems$;


  /**
   *
   */
  constructor(private menuService: MenuService) {


  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

toggleVisibility(itemName: string): void {
    this.menuService.toggleVisibility(itemName);
  }


}
