import {Component} from '@angular/core';

import {ChukuService} from './chuku.service';
import {Mychuku} from './chuku.directive';
// We `import` `http` into our `ChukuService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';
import {Item} from '../items/item.component';
// Import NgFor directive
import {NgFor} from '@angular/common';
import {Router} from '@angular/router-deprecated';
// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'chuku',
    // Let Angular 2 know about `Http` and `ChukuService`
    providers: [...HTTP_PROVIDERS, ChukuService],
    template: require('./chuku.html'),
    directives: [
      Mychuku
    ]
})
export class Chuku {

  // Initialize our `chukuData.text` to an empty `string`
  chukuData = {
    user: '',
    name: '',
    price: null,
    number: 0,
    kuaidi: '',
    date: '',
    text: ''
  };
  private shows: number = 5;
  private selected: number = 3;
  private chukus: Array<Chuku> = [];
  private items: Array<Item> = [];
  private array: Array<any> = [];
  private count: number = 0;
  private a = 0;
  constructor(private router: Router, public chukuService: ChukuService) {
    console.log('Chuku constructor go!');
      if (localStorage.getItem('token')) {
          console.log(JSON.parse(localStorage.getItem('token')));
      } else {

        router.navigate(['Index']);
      }
      //this.chukus = [];
      chukuService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `chuku` array with the `response` data
            this.chukus = res;
            for (let chuku of res){
            this.a += chuku.price * chuku.number - parseInt(chuku.kuaidi);
            }
            // Reset `chuku` input
            this.chukuData.text = '';
            this.chukuData.name = '';
            this.chukuData.price = null;
            this.chukuData.number = 0;
            this.chukuData.user = '';
            this.chukuData.kuaidi = '';
            this.chukuData.date = '';
        });

      chukuService.getAllitem()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `chuku` array with the `response` data
            this.items = res;


            // Reset `chuku` input
        });
  }

  createChuku() {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.chukuData.name = this.chukuData.name.split('+')[1];
      this.chukuService.createChuku(this.chukuData)
        .subscribe((res) => {

          // Populate our `chuku` array with the `response` data
          this.chukus = res;
          // Reset `chuku` input
          this.chukuData.text = '';
          this.chukuData.name = '';
          this.chukuData.price = null;
          this.chukuData.number = 0;
          this.chukuData.user = '';
          this.chukuData.kuaidi = '';
          this.chukuData.date = '';
        });

      // this.chukuService.updateItem(this.chukuData.number)
      //   .subscribe((res) => {

      //       // Populate our `chuku` array with the `response` data
      //       this.chukus = res;
      //       // Reset `chuku` input
      //  });
    }

  }

  deleteChuku(id) {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.chukuService.deleteChuku(id)
        .subscribe((res) => {

          // Populate our `chuku` array with the `response` data
          this.chukus = res;
        });
    }
  }

  isadmin(){
    return (JSON.parse(localStorage.getItem('token')).role === "admin");
  }

  updateChuku(id) {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.chukuData.name = this.chukuData.name.split('+')[1];
      this.chukuService.updateChuku(id,this.chukuData)
        .subscribe((res) => {

          // Populate our `item` array with the `response` data
          this.items = res;
          location.reload();
        });
    }
  }

}
