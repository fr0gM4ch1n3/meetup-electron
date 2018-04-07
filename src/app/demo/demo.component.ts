import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron'; // import electron wrapper for angular

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  public messages: string[] = [];

  constructor(private _electronService: ElectronService) {

    // execute code only if we are in a electron app
    if (this._electronService.isElectronApp) {

      // synchronous messages to the nodejs server
      const response = this._electronService.ipcRenderer.sendSync('synchronous-message', 'synchronous-ping');
      this.messages.push(response);
      console.log(response); // prints "synchronous-pong"

      // receive and send asynchronous messages
      this._electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg); // prints "asynchronous-pong"
        this.messages.push(arg);
      });
      this._electronService.ipcRenderer.send('asynchronous-message', 'asynchronous-ping');

      // use node modules:
      let fileContent = '';
      try {
        fileContent = this._electronService.remote.require('fs').readFileSync('/tmp/meetup').toString('utf8');
      } catch (err) {
        fileContent = err.message;
      }
      console.log(fileContent);
      this.messages.push(fileContent);
    }
  }

  ngOnInit() {
  }

}
