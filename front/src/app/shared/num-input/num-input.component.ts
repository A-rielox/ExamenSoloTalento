import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
   selector: 'app-num-input',
   templateUrl: './num-input.component.html',
   styleUrls: ['./num-input.component.css'],
})
export class NumInputComponent implements ControlValueAccessor {
   @Input() label = '';
   @Input() min = 0;
   @Input() max = 99999;
   // @Input() type = 'text';

   // de esta forma tengo acceso al control dentro DE ESTE componente ( cuando lo use dentro de las form desde las que lo voy a llamar )
   constructor(@Self() public ngControl: NgControl) {
      // this es el TextInputComponent
      this.ngControl.valueAccessor = this;
   }

   writeValue(obj: any): void {}
   registerOnChange(fn: any): void {}
   registerOnTouched(fn: any): void {}

   get control(): FormControl {
      return this.ngControl.control as FormControl;
   }
}
