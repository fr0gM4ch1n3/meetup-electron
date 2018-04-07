import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron'; // import electron wrapper for angular

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.css']
})
export class Demo2Component implements OnInit {
  public messages: string[] = [];

  constructor(
    private _electronService: ElectronService,
    private _ngZone: NgZone
  ) {

    // execute code only if we are in a electron app
    if (this._electronService.isElectronApp) {
      const that = this;

      // synchronous messages to the nodejs server
      const response = this._electronService.ipcRenderer.sendSync('synchronous-message', 'synchronous-ping');
      this.messages.push(response);
      console.log(response); // prints "synchronous-pong"

      // receive and send asynchronous messages
      this._electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg); // prints "asynchronous-pong"
        // we need to notify angular about changes from external callback
        // for this, we use ngZone
        _ngZone.run(function () {
          that.messages.push(arg);
        });
      });
      this._electronService.ipcRenderer.send('asynchronous-message', 'asynchronous-ping');

      // use node modules:
      this._electronService.remote.require('fs').readFile('/tmp/meetup', (err: Error, data: string | Buffer) => {
        _ngZone.run(function () {
          if (err) {
            console.log(err.message);
            that.messages.push(err.message);
          } else {
            console.log(typeof data === 'string' ? data : data.toString('utf8'));
            that.messages.push(typeof data === 'string' ? data : data.toString('utf8'));
          }
        });
      });
    }
  }

  ngOnInit() {
  }

}
