import { Component } from '@angular/core';
import { Menu } from '../../Interfaces/Menu/menu';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {

  menu: Menu = {
    employesVisibilityStatus: false,
    departmentVisibilityStatus: false,
  };

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  departmentClicked(): void {

    this.menu.departmentVisibilityStatus = !this.menu.departmentVisibilityStatus;
    console.log('department clicked',this.menu.departmentVisibilityStatus);
  }

  employeClicked(): void {

    this.menu.employesVisibilityStatus = !this.menu.employesVisibilityStatus;
    console.log('employe clicked',this.menu.employesVisibilityStatus);
  }


}
