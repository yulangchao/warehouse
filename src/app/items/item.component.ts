import {Component} from '@angular/core';
import {ItemService} from './item.service';
import {Router} from '@angular/router-deprecated';
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
    price: 0,
    saleprice: 0,
    number: 0,
    text: ''
  };

  private shows: number = 5;
  private items: Array<Item> = [];
  private rukus: Array<any> = [];
  private chukus: Array<any> = [];
  private arrays: Array<number> = [];
  private clicked: boolean = false;
  constructor(private router: Router, public itemService: ItemService) {
    console.log('Item constructor go!');
      if (localStorage.getItem('token')) {
          console.log(JSON.parse(localStorage.getItem('token')));
      } else {

        router.navigate(['Index']);
      }
                itemService.getAll()
                  // `Rxjs`; we subscribe to the response
                  .subscribe((res) => {

                      // Populate our `item` array with the `response` data
                      this.items = res;
                      // Reset `item` input
                      this.itemData.text = '';
                      this.itemData.name = '';
                      this.itemData.price = 0;
                      this.itemData.number = 0;
                      this.itemData.saleprice = 0;
                  });
       let t = setInterval(() => {

          if(window.location.hash === "#/item"){

            if (this.clicked === true){
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
                 this.clicked = false;
            }
          }else{

              clearInterval(t);
          }

      }, 1000);
  }

  createItem() {
      if (JSON.parse(localStorage.getItem('token')).role === "admin") {
        console.log("111");
      this.itemService.createItem(this.itemData)
        .subscribe((res) => {

            // Populate our `item` array with the `response` data
            this.items = res;
            // Reset `item` input
            this.itemData.text = '';
            this.itemData.name = '';
            this.itemData.price = 0;
            this.itemData.number = 0;
            this.itemData.saleprice = 0;
        });
      }
  }

  deleteItem(id) {
      if (JSON.parse(localStorage.getItem('token')).role === "admin") {

        this.itemService.deleteItem(id)
          .subscribe((res) => {

              // Populate our `item` array with the `response` data
              this.items = res;
          });
      }
  }

  updateItem(id) {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {

      this.itemService.updateItem(id,this.itemData)
        .subscribe((res) => {

          // Populate our `item` array with the `response` data
          this.items = res;
          location.reload();
        });
    }
  }

  updateItems(){
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.itemService.getAllruku()
        .subscribe((res) => {

          // Populate our `item` array with the `response` data
          this.rukus = res;
          console.log(this.rukus);
          for (let ruku of this.rukus) {
            console.log(ruku.number);
            if (isNaN(this.arrays[ruku.name])) {
              this.arrays[ruku.name] = 0;
            }
            this.arrays[ruku.name] = this.arrays[ruku.name] + ruku.number
          }
          console.log(this.arrays);
          this.itemService.getAllchuku()
            .subscribe((res) => {

              // Populate our `item` array with the `response` data
              this.chukus = res;
              console.log(this.chukus);
              for (let chuku of this.chukus) {
                console.log(chuku.number);
                if (isNaN(this.arrays[chuku.name])) {
                  this.arrays[chuku.name] = 0;
                }
                this.arrays[chuku.name] = this.arrays[chuku.name] - chuku.number
              }
              console.log(this.arrays);
              for (let array in this.arrays) {
                console.log(array);
                console.log(this.arrays[array]);
                this.itemService.updateItem(array, {number: this.arrays[array]})
                  .subscribe((res) => {

                  });
              }
              this.clicked = true;
              this.arrays = [];

            });

        });
    }
  }
  isadmin(){
    return (JSON.parse(localStorage.getItem('token')).role === "admin");
  }
}
