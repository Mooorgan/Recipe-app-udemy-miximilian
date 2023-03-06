import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }
  // constructor() {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    event.preventDefault();
    // event.stopImmediatePropagation();
    // console.log(event);
    // console.log(event.target);
    // console.dir(this.elRef.nativeElement);
    // console.dir(this.elRef.nativeElement.contains(event.target));
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
}
