import {Component} from '@angular/core';

import {SummaryService} from './summary.service';

// We `import` `http` into our `SummaryService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';
import {Router} from '@angular/router-deprecated';
// Import NgFor directive
import {NgFor} from '@angular/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'summary',
    // Let Angular 2 know about `Http` and `SummaryService`
    providers: [...HTTP_PROVIDERS, SummaryService],
    template: require('./summary.html')
})

export class Summary {

  // Initialize our `summaryData.text` to an empty `string`
  summaryData = {
    name: '',
    price: null,
    saleprice: null,
    number: 0,
    text: ''
  };


  private summarys: Array<any> = [];
  private rukus: Array<any> = [];
  private chukus: Array<any> = [];
  private arrays: Array<any> = [];
  private outcome: number = 0;
  private income: number = 0;
  constructor(private router: Router, public summaryService: SummaryService) {
    console.log('Summary constructor go!');
      if (localStorage.getItem('token')) {
          console.log(JSON.parse(localStorage.getItem('token')));
      } else {

        router.navigate(['Index']);
      }
          summaryService.getAllruku()

          .subscribe((res) => {
            // Populate our `summary` array with the `response` data
            this.rukus = res;
            for (let ruku of this.rukus) {
              if (isNaN(this.arrays[ruku.name])) {
                this.arrays[ruku.name] = 0;
              }
              this.arrays[ruku.name] = this.arrays[ruku.name] + ruku.number;
              this.outcome += ruku.number * ruku.price;
            }
            summaryService.getAllchuku()
              .subscribe((res) => {

                // Populate our `summary` array with the `response` data
                this.chukus = res;
                for (let chuku of res) {
                  if (isNaN(this.arrays[chuku.name])) {
                    this.arrays[chuku.name] = 0;
                  }
                  this.arrays[chuku.name] = this.arrays[chuku.name] - chuku.number;
                  this.income += chuku.number * chuku.price - chuku.kuaidi;
                }
                for(let i in this.arrays){
                     this.summarys.push({name:i, number : this.arrays[i]});
                }
               console.log(this.arrays);
              });

          });


  }

}
