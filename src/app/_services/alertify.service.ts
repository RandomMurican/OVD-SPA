import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
messages = [];

constructor() {
  this.messages.push('Now listening for activity.');
}

confirm(message: string, okCallback: () => any) {
  alertify.confirm(message, function(response) {
    if (response) {
      return okCallback();
    }
  });
}

success(message: string, addMessage: boolean) {
  alertify.success(message);
  if (addMessage) {
    this.addMessage(message);
  }
}

error(message: string, addMessage: boolean) {
  alertify.error(message);
  if (addMessage) {
    this.addMessage(message);
  }
}

addMessage(msg: string) {
  this.messages.push(msg);
}

getMessages() {
  return this.messages;
}

}
