import { Component } from '@angular/core';

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
            bluetoothSerial.list(
                (results) => {
                    this.display(JSON.stringify(results));
                    this.loaded = true;
                },
                (error) => {
                    this.display(JSON.stringify(error));
                }
            );
        }

        var notEnabled = function () {
            this.display("Bluetooth is not enabled.")
        }

        bluetoothSerial.isEnabled(
            listPorts,
            notEnabled
        );
    }

    manageConnection() {
        debugger;
        var connect = () => {
            debugger;
            this.clear();
            this.display("Attempting to connect. " +
                "Make sure the serial port is open on the target device.");
            // attempt to connect:
            bluetoothSerial.connect(
                this.macAddress,  // device to connect to
                this.openPort,    // start listening if you succeed
                this.showError    // show the error if you fail
            );
        };

        var disconnect = () => {
            this.display("attempting to disconnect");
            bluetoothSerial.disconnect(
                this.closePort,     // stop listening to the port
                this.showError      // show the error if you fail
            );
        };

        bluetoothSerial.isConnected(disconnect, connect);
    }

    openPort() {
        debugger;
        this.display("Connected to: " + this.macAddress);
        bluetoothSerial.subscribe('\n', function (data) {
            this.clear();
            this.display(data);
        });
    }

    closePort() {
        this.display("Disconnected from: " + this.macAddress);
        bluetoothSerial.unsubscribe(
            function (data) {
                this.display(data);
            },
            this.showError
        );
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
