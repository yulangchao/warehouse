import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[myruku]' })


export class Myruku {
    constructor(el: ElementRef) {
      //  setTimeout(function(){
      //  let arrays = [].slice.call(el.nativeElement.children[2].children);
      //  arrays.splice(0,1);
      //  let sum: number = 0;
      //  let length = arrays.length;
      //  let i = 0;
      //  for (let array of arrays){

      //    sum += parseInt(array.children[0].children[5].innerHTML);
      //    i++;
      //  }
      // el.nativeElement.children[1].innerHTML = el.nativeElement.children[1].innerHTML + sum;
      //   }, 1000);
    }
}
