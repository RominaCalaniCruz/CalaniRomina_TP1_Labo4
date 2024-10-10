import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { tdesignGamepad1 , tdesignListNumbered} from '@ng-icons/tdesign-icons';
import { jamGamepadRetroF,jamPlaySquareF , jamWriteF} from '@ng-icons/jam-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router } from '@angular/router';
import { EncuestaComponent } from '../encuesta/encuesta.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent,EncuestaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideIcons({ tdesignGamepad1, jamGamepadRetroF,jamPlaySquareF,tdesignListNumbered ,jamWriteF})],
})
export class HomeComponent {
  // @ViewChild(EncuestaComponent) encuestaModal!: EncuestaComponent;
  @ViewChild('encuesta') encuesta!: EncuestaComponent;
  authsvc = inject(AuthService);
  isDropdownOpen: boolean = false;
  toastM = inject(ToastrService);

  abrirModal() {
    this.encuesta.abrir();
  }
  constructor(private router: Router) {

  }
  goTo(path: string) {
    if(path=="resultados"){
      if(this.authsvc.sesionActiva){
        this.router.navigate([path]);
      }
      else{
        this.toastM.error("Debes iniciar sesión para acceder a los resultados.","Error");
      }
    }
    else{
      this.router.navigate([path]);
    }
  }

  // openModal(): void {
  //   this.encuesta.openModal();
  // }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: Event) {
    const dropdownButton = document.getElementById('user-menu-button');
    const dropdownMenu = document.getElementById('user-dropdown');
    if (dropdownButton && dropdownMenu && !dropdownButton.contains(event.target as Node) && !dropdownMenu.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }
}
