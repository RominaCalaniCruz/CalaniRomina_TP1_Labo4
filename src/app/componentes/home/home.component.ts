import { Component } from '@angular/core';
import { tdesignGamepad1 } from '@ng-icons/tdesign-icons';
import { jamGamepadRetroF,jamPlaySquareF } from '@ng-icons/jam-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideIcons({ tdesignGamepad1, jamGamepadRetroF,jamPlaySquareF })],
})
export class HomeComponent {
  constructor(private router: Router) {

  }
  goTo(path: string) {
    this.router.navigate([path]);
  }
}
