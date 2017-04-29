import {Component} from '@angular/core';

import {ProfileService} from './profile.service';
import {Router} from '@angular/router-deprecated';
// We `import` `http` into our `ProfileService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'profile',
    // Let Angular 2 know about `Http` and `ProfileService`
    providers: [...HTTP_PROVIDERS, ProfileService],
    template: require('./profile.html')
})
export class Profile {

  // Initialize our `profileData.text` to an empty `string`


    profile = {
        name: '',
        email: '',
        phone: '',
        type: '',
        logo: 0
    };
    private isReadonly: boolean = true;
  constructor(private router: Router, public profileService: ProfileService) {
    console.log('Profile constructor go!');
      if (localStorage.getItem('token')) {
          profileService.getAll()
          // `Rxjs`; we subscribe to the response
              .subscribe((res) => {
                  // Populate our `profile` array with the `response` data
                  this.profile.email = res.email;
                  this.profile.name = res.name;
                  this.profile.type = "1";
                  this.profile.logo = 2;
                   this.profile.phone = res.phone;
                  // Reset `profile` input
                  console.log(this.profile.phone);
              });
      } else {
          router.navigate(['Index']);
      }
  }

    updateProfile() {

      this.profileService.updateProfile(this.profile.email,this.profile)
        .subscribe((res) => {
           console.log(res);
            // Populate our `profile` array with the `response` data
            this.profile = res;
            // Reset `profile` input

        });
  }

    reset(st: HTMLInputElement){
        st.value = this.profile.phone;
    }
}
