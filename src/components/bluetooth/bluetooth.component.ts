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
            console.log(`done`);
            this.onDeviceReady();
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    onDeviceReady() {
        var listPorts = () => {
            debugger;
            BluetoothSerial.list().then(
                (results) => {
                    console.log(`listports    ` + results);
                    console.log(JSON.stringify(results));
                    this.loaded = true;
                }).catch(
                    (error) => {
                        console.log(`listports    errr    ` + error);
                        console.log(JSON.stringify(error));
                    }
                );
        };


        var notEnabled = () => {

            console.log("Bluetooth is not enabled.")
        }

        BluetoothSerial.isEnabled(
        ).then(data => {
            debugger;
            console.log(`enabled    ` + data);

            listPorts();
        }).catch((err) => {
            console.log(`enabled    err` + err);
            debugger;
            notEnabled();
        });
    }

    manageConnection() {
        debugger;
        var connect = () => {
            debugger;

            console.log(`connect    init`);
            
            console.log("Attempting to connect. " +
                "Make sure the serial port is open on the target device.");
            // attempt to connect:
            BluetoothSerial.connect(
                this.macAddress,  // device to connect to
                //              this.openPort,    // start listening if you succeed
                //                this.showError    // show the error if you fail
            ).subscribe(connect => {
                console.log(`connect 2    ` + connect);
                debugger;
            });
        };

        var disconnect = () => {
            console.log("attempting to disconnect");
            BluetoothSerial.disconnect().then(this.closePort).catch(this.showError);
        };

        BluetoothSerial.isConnected().then(data => {
            console.log(`isconnected   ` + data);
            debugger;
        }).catch(err => {
            console.log(`isconnecte   err`  + err);
            debugger;
            connect();
        });
    }

    openPort() {
        debugger;
         console.log("Connected to: " + this.macAddress);
         /*
           this.connection.subscribe('\n', function (data) {
               this.clear();
               console.log(data);
           });*/
    }

    closePort() {
        console.log("Disconnected from: " + this.macAddress);
        /*     BluetoothSerial.unsubscribe(
                  function (data) {
                      console.log(data);
                  },
                  this.showError
              );
              */
    }

    showError(error) {
        debugger;
        console.log(error);
    }

    display(message) {
        console.log(`display ` + message);
    }
}
