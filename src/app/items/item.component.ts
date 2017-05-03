import {Component} from '@angular/core';

import {ItemService} from './item.service';

// We `import` `http` into our `ItemService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'item',
    // Let Angular 2 know about `Http` and `ItemService`
    providers: [...HTTP_PROVIDERS, ItemService],
    template: require('./item.html')
})
export class Item {

  // Initialize our `itemData.text` to an empty `string`
  itemData = {
    name: '',
    price: null,
    saleprice: null,
    number: 0,
    text: ''
  };


  private items: Array<Item> = [];
  private rukus: Array<any> = [];
  private arrays: Array<number> = [];
  constructor(public itemService: ItemService) {
    console.log('Item constructor go!');

      itemService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `item` array with the `response` data
            this.items = res;
            // Reset `item` input
            this.itemData.text = '';
            this.itemData.name = '';
            this.itemData.price = null;
            this.itemData.number = 0;
            this.itemData.saleprice = null;
        });
  }

  createItem() {

      this.itemService.createItem(this.itemData)
        .subscribe((res) => {

            // Populate our `item` array with the `response` data
            this.items = res;
            // Reset `item` input
            this.itemData.text = '';
            this.itemData.name = '';
            this.itemData.price = null;
            this.itemData.number = 0;
            this.itemData.saleprice = null;
        });
  }

  deleteItem(id) {

    this.itemService.deleteItem(id)
      .subscribe((res) => {

          // Populate our `item` array with the `response` data
          this.items = res;
      });
  }
  updateItems(){
    this.itemService.getAllruku()
      .subscribe((res) => {

        // Populate our `item` array with the `response` data
        this.rukus = res;
        console.log(this.rukus);
        for (let ruku of this.rukus){
            console.log(ruku.number);
            if(isNaN(this.arrays[ruku.name])){
              this.arrays[ruku.name] = 0;
            }
            this.arrays[ruku.name] = this.arrays[ruku.name] + ruku.number
        }
        console.log(this.arrays);



        this.arrays = [];
      });

  }
}
