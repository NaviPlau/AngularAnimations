import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../shared/directives/click-outside.directive';
import {
  animate,
  style,
  transition,
  trigger,
  state,
  query,
  stagger,
  sequence
} from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, CommonModule, ClickOutsideDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      state('false', style({ transform: 'translateX(100%)' })), 
      state('true', style({ transform: 'translateX(0%)' })),    
  
      transition('false => true', sequence([
        style({ transform: 'translateX(100%)' }), 
        animate('0.5s ease-in'), 
        query('a', [
          style({ opacity: 0, transform: 'scale(0.7)' }), 
          stagger(100, [
            animate('300ms ease-in', style({ opacity: 1, transform: 'scale(1)' })) 
          ])
        ], { optional: true })
      ])),
  
      transition('true => false', sequence([
        // Fade out links BEFORE menu starts sliding away
        query('a', [
          stagger(-100, [
            animate('200ms ease-out', style({ opacity: 0, transform: 'scale(0.7)' }))
          ])
        ], { optional: true }),
  
        animate('0.5s ease-in', style({ transform: 'translateX(100%)' })),
      ]))
    ])
  ]
})
export class LoginComponent {
  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
    if (this.menuOpen()) {
      this.linkstate('0', 'scale(0.7)');
      setTimeout(() => {
        this.linkstate('1', 'scale(1)');
      },1300);
    } else {
      setTimeout(() => {
        this.linkstate('0', 'scale(0.7)');
      }, 1300);
      
    }
  }

  closeMenu = () => {
    this.menuOpen.set(false);
  };

  linkstate(opac: string, scale: string) {
    document.querySelectorAll('a').forEach(link => {
      (link as HTMLElement).style.opacity = opac;
      (link as HTMLElement).style.transform = scale;
    });
  }
  
}
