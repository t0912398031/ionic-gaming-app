import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '../environments/environment';
import { FirebaseConfig } from '@ionic-native/firebase-config/ngx';

import * as admin from 'firebase-admin';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private firebaseConfig: FirebaseConfig
    private router: Router,
    // private fireAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  // //     this.firebaseConfig.getBoolean('my_key')
  // // .then((res: any) => console.log(res))
  // // .catch((error: any) => console.error(error));

  //     firebase.initializeApp(environment.firebaseConfig );
  //   });
  // }


  initializeApp() {

   


    this.platform.ready().then(() => {
      // if (this.platform.is('cordova')) { 
      //   // make your native API calls 
      // } else { 
      //   // fallback to browser APIs 
      // }

   
      // firebaseConfig
      firebase.initializeApp(environment.firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log("user exist");
          this.router.navigate(["/profile"]);
          this.splashScreen.hide();
        }
        else {
          console.log("no user found");
          this.router.navigate(["/login"]);
          this.splashScreen.hide();
        }
      })

      // this.fireAuth.auth.onAuthStateChanged(user => {
      //   if (user) {
      //     console.log("user exist");
      //     this.router.navigate(["/profile"]);
      //     this.splashScreen.hide();
      //   }
      //   else {
      //     console.log("no user found");
      //     this.router.navigate(["/home"]);
      //     this.splashScreen.hide();
      //   }
      // })
      this.statusBar.styleDefault();
    });
  }
}
