import { Component } from '@angular/core';
import { MenuService } from './Services/Menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  activeComponent$ = this.menuService.activeComponent$;

  /**
   *
   */
  constructor(private menuService: MenuService) {


  }

  ngOnInit(): void {
    // Suscripción para recibir actualizaciones del componente activo
  }

}
