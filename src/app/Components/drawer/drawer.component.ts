import { Component } from '@angular/core';
import { Menu } from '../../Interfaces/Menu/menu';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {

  menuItems: Menu[] = [
    { name: 'employes', visibilityStatus: false },
    { name: 'departments', visibilityStatus: false }
  ];

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  toggleVisibility(itemName: string): void {
    this.menuItems.forEach(item => {
      item.visibilityStatus = (item.name === itemName) ? !item.visibilityStatus : false;
      console.log(item.name);
      console.log(item.visibilityStatus);
    });
    this.close();
  }


}
