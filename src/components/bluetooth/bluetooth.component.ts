import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'bluetooth-connector',
    templateUrl: 'bluetooth.component.html'
})
export class BluetoothComponent {
    public macAddress = "00:1F:20:74:C2:73";
    public chars = "";
    private loaded = false;

    constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.onDeviceReady();
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    onDeviceReady() {
        var listPorts = function () {
            debugger;
            BluetoothSerial.list().then(
                (results) => {
                    this.display(JSON.stringify(results));
                    this.loaded = true;
                }).catch(
                    (error) => {
                        this.display(JSON.stringify(error));
                    }
                );
        };


        var notEnabled = function () {
            this.display("Bluetooth is not enabled.")
        }

        BluetoothSerial.isEnabled(
        ).then(data => {
            debugger;

            listPorts();
        }).catch((err) => {
            debugger;
            notEnabled();
        });
    }

    manageConnection() {
        debugger;
        var connect = () => {
            debugger;
            this.clear();
            this.display("Attempting to connect. " +
                "Make sure the serial port is open on the target device.");
            // attempt to connect:
            BluetoothSerial.connect(
                this.macAddress,  // device to connect to
                //              this.openPort,    // start listening if you succeed
                //                this.showError    // show the error if you fail
            ).subscribe(connect => {
                debugger;
            });
        };

        var disconnect = () => {
            this.display("attempting to disconnect");
            BluetoothSerial.disconnect().then(this.closePort).catch(this.showError);
        };

        BluetoothSerial.isConnected().then(data => {
            debugger;
        }).catch(err => {
            debugger;
        });
    }

    openPort() {
        debugger;
     /*   this.display("Connected to: " + this.macAddress);
        this.connection.subscribe('\n', function (data) {
            this.clear();
            this.display(data);
        });*/
    }

    closePort() {
        this.display("Disconnected from: " + this.macAddress);
  /*     BluetoothSerial.unsubscribe(
            function (data) {
                this.display(data);
            },
            this.showError
        );
        */
    }

    showError(error) {
        debugger;
        this.display(error);
    }

    display(message) {
        var display = document.getElementById("message"), // the message div
            lineBreak = document.createElement("br"),     // a line break
            label = document.createTextNode(message);     // create the label

        display.appendChild(lineBreak);          // add a line break
        display.appendChild(label);              // add the message node
    }

    clear() {
        var display = document.getElementById("message");
        display.innerHTML = "";
    }
}
