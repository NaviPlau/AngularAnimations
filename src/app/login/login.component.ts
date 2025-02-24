import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../shared/directives/click-outside.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, CommonModule, ClickOutsideDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger(
      'openClose',
      [
        state('false', style({ transform : 'translateX(100%)' })),
        state('true', style({ transform: 'translateX(0%)' })),    
        transition('true <=> false', [
          animate('0.5s ease-in')
        ])
      ]
    )
  ]
})
export class LoginComponent {
  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
  }

  closeMenu = () => {
    this.menuOpen.set(false);
  };
}

