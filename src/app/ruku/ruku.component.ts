import {Component} from '@angular/core';

import {RukuService} from './ruku.service';

// We `import` `http` into our `RukuService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';
import {Item} from '../items/item.component';
// Import NgFor directive
import {NgFor} from '@angular/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'ruku',
    // Let Angular 2 know about `Http` and `RukuService`
    providers: [...HTTP_PROVIDERS, RukuService],
    template: require('./ruku.html')
})
export class Ruku {

  // Initialize our `rukuData.text` to an empty `string`
  rukuData = {
    user: '',
    name: '',
    price: null,
    number: 0,
    location: '',
    date: '',
    text: ''
  };
  private selected: number = 3;
  private rukus: Array<Ruku> = [];
  private items: Array<Item> = [];
  private array: Array<any> = [];
  private count: number = 0;
  constructor(public rukuService: RukuService) {
    console.log('Ruku constructor go!');

      //this.rukus = [];
      rukuService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `ruku` array with the `response` data
            this.rukus = res;
            // Reset `ruku` input
            this.rukuData.text = '';
            this.rukuData.name = '';
            this.rukuData.price = null;
            this.rukuData.number = 0;
            this.rukuData.user = '';
            this.rukuData.location = '';
            this.rukuData.date = '';
        });

      rukuService.getAllitem()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `ruku` array with the `response` data
            this.items = res;


            // Reset `ruku` input
        });
  }

  createRuku() {
      this.rukuData.name = this.rukuData.name.split('+')[1];
      this.rukuService.createRuku(this.rukuData)
        .subscribe((res) => {

            // Populate our `ruku` array with the `response` data
            this.rukus = res;
            // Reset `ruku` input
          this.rukuData.text = '';
          this.rukuData.name = '';
          this.rukuData.price = null;
          this.rukuData.number = 0;
          this.rukuData.user = '';
          this.rukuData.location = '';
          this.rukuData.date = '';
        });

      // this.rukuService.updateItem(this.rukuData.number)
      //   .subscribe((res) => {

      //       // Populate our `ruku` array with the `response` data
      //       this.rukus = res;
      //       // Reset `ruku` input
      //  });


  }

  deleteRuku(id) {

    this.rukuService.deleteRuku(id)
      .subscribe((res) => {

          // Populate our `ruku` array with the `response` data
          this.rukus = res;
      });
  }

  updateItem(){
    this.rukuService.getItem(this.rukuData.name)
      .subscribe((res) => {

        // Populate our `ruku` array with the `response` data;
        console.log(parseInt("" + this.rukuData.number));
        this.count = res.number + parseInt("" + this.rukuData.number);
        console.log(this.count);
        this.rukuService.updateItem(this.rukuData.name,this.count)
          .subscribe((res) => {

          });

      });



  }

}
