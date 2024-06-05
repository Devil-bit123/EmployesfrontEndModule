import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../../Interfaces/Menu/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuItemsSource = new BehaviorSubject<Menu[]>([
    { name: 'Employes', visibilityStatus: false },
    { name: 'Departments', visibilityStatus: false }
  ]);

  private activeComponentSource = new BehaviorSubject<string>('');

  menuItems$ = this.menuItemsSource.asObservable();
  activeComponent$ = this.activeComponentSource.asObservable();

  toggleVisibility(itemName: string): void {
    const updatedMenuItems = this.menuItemsSource.value.map(item => {
      item.visibilityStatus = (item.name === itemName) ? !item.visibilityStatus : false;
      return item;
    });
    this.menuItemsSource.next(updatedMenuItems);

    const activeItem = updatedMenuItems.find(item => item.visibilityStatus);
    this.activeComponentSource.next(activeItem ? activeItem.name : '');
  }


}
