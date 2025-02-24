import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Input() appClickOutside!: () => void;
  constructor(private elementRef: ElementRef) {}
  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement): void {
    const isInside = this.elementRef.nativeElement.contains(targetElement);
    if (!isInside && this.appClickOutside) {
      console.log("ClickOutsideDirective: Calling the function to close the menu.");
      this.appClickOutside(); 
    }
  }
}





