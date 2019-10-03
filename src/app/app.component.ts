import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '../environments/environment';
// import { FirebaseConfig } from '@ionic-native/firebase-config/ngx';
import { LocationTracker } from '../providers/location-tracker';
// import * as admin from 'firebase-admin';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';


import { Router } from '@angular/router';
import { SharingService } from './service/sharing.service';
// import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
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
    },
    {
      title: 'profile',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'map',
      url: '/map',
      icon: 'locate'
    },
    {
      title: 'test',
      url: '/test',
      icon: 'settings'
    }
  ];

  public u = false;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private firebaseConfig: FirebaseConfig
    private router: Router,
    private sharingService: SharingService,
    // private location,
    // private fireAuth: AngularFireAuth
    private locationTracker: LocationTracker
    // private backgroundGeolocation: BackgroundGeolocation
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

      
      // this.locationTracker.startTracking();
   
      // firebaseConfig
      firebase.initializeApp(environment.firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.u = true;

          console.log("user exist");
          this.router.navigate(["/profile"]);
          // this.locationTracker.startTrackingWeb().subscribe(data=>{
          //   console.log(data);
            
          // })
          this.locationTracker.startTrackingWeb()
          // this.locationTracker.getPosition().subscribe(data=>{
          //   console.log(data);
            
          // })
          let currentUser = {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
            isAnonymous: user.isAnonymous,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            refreshToken: user.refreshToken
          }
          this.sharingService.save(currentUser);


          this.splashScreen.hide();
        }
        else {
          console.log("no user found");
          this.router.navigate(["/login"]);
          // this.router.navigate(["/test"]);
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

      // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      // document.body.classList.toggle('dark', false);
    });
  }
}
