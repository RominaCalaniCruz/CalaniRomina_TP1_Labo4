import { Component, ViewChild } from '@angular/core';
import { tdesignGamepad1 , tdesignListNumbered} from '@ng-icons/tdesign-icons';
import { jamGamepadRetroF,jamPlaySquareF , jamWriteF} from '@ng-icons/jam-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router } from '@angular/router';
import { EncuestaComponent } from '../encuesta/encuesta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent,EncuestaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideIcons({ tdesignGamepad1, jamGamepadRetroF,jamPlaySquareF,tdesignListNumbered ,jamWriteF})],
})
export class HomeComponent {
  @ViewChild(EncuestaComponent) encuestaModal!: EncuestaComponent;
  constructor(private router: Router) {

  }
  goTo(path: string) {
    this.router.navigate([path]);
  }

  openModal(): void {
    this.encuestaModal.openModal();
  }
}
