import {Component} from '@angular/core';
import {Angular2AutoScroll} from "angular2-auto-scroll/lib/angular2-auto-scroll.directive";
import {ChatService} from './chat.service';
import {Router} from '@angular/router-deprecated';
// We `import` `http` into our `ChatService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'chat',
    // Let Angular 2 know about `Http` and `ChatService`
    providers: [...HTTP_PROVIDERS, ChatService],
    template: require('./chat.html'),
    directives: [Angular2AutoScroll]
})
export class Chat {

  // Initialize our `chatData.text` to an empty `string`
  chatData = {
    text: '',
    name: '',
    date: ''
  };

  private chats: Array<Chat> = [];
  private check_chat: number = 0;
  private submit_name: number= 0;
  private length_check: number = 0;

  constructor(private router: Router, public chatService: ChatService) {
      console.log('Chat constructor go!');
      if (localStorage.getItem('token')) {
          console.log(JSON.parse(localStorage.getItem('token')));
          this.chatData.name = JSON.parse(localStorage.getItem('token')).local.name;
          console.log(this.chatData.name);
      } else {
         this.chatData.name = "";
        router.navigate(['Index']);
      }

      //this.chats = [];才
      chatService.getAll()
      // `Rxjs`; we subscribe to the response
          .subscribe((res) => {

              // Populate our `todo` array with the `response` data
              this.chats = res;
              this.length_check = this.chats.length;
              // Reset `todo` input
              this.chatData.text = '';
          });


      let t = setInterval(() => {


          if(window.location.hash === "#/chat"){
              chatService.getAll()
              // `Rxjs`; we subscribe to the response
                  .subscribe((res) => {
                      // Populate our `todo` array with the `response` data
                      if (this.length_check < res.length){
                          this.chats = res;
                          this.length_check = res.length;
                      }

                      // Reset `todo` input
                  });}else{

              clearInterval(t);
          }

      }, 1000);
  }

  createChat() {
    this.chatData.date = (new Date()).toString().split('G')[0];
      this.chatService.createChat(this.chatData)
        .subscribe((res) => {

            // Populate our `chat` array with the `response` data
            this.chats = res;
            // Reset `chat` input
            this.chatData.text = '';
        });
  }

  deleteChat(id) {

    this.chatService.deleteChat(id)
      .subscribe((res) => {

          // Populate our `chat` array with the `response` data
          this.chats = res;
      });
  }
}
