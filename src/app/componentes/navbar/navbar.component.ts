import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { jamGamepadRetroF, jamLogIn } from '@ng-icons/jam-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matAccountCircle } from '@ng-icons/material-icons/baseline';
import { tablerSquareX, tablerMenu4 } from '@ng-icons/tabler-icons'
import { LoginComponent } from '../login/login.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent, LoginComponent, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  providers: [provideIcons({ jamGamepadRetroF, matAccountCircle, tablerSquareX, jamLogIn, tablerMenu4 })],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @ViewChild('login') loginCmp!: LoginComponent;
  authSvc = inject(AuthService);
  isDropdownOpen: boolean = false;

  abrirModal() {
    this.loginCmp.abrir();
  }

  ngOnInit() {
  }

  cerrarSesion() {
    this.authSvc.closeSession();
    this.isDropdownOpen = false;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: Event) {
    const dropdownButton = document.getElementById('user-menu-button');
    const dropdownMenu = document.getElementById('user-dropdown');
    
    // Verifica si el clic ocurrió fuera del botón o el dropdown
    if (dropdownButton && dropdownMenu && !dropdownButton.contains(event.target as Node) && !dropdownMenu.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }
}
