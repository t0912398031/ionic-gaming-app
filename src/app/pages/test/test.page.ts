import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

// import * as firebase from 'firebase';
import * as firebase from "firebase/app";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

// import { FirebaseX } from "@ionic-native/firebase-x/ngx";
@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  loading: any;
  test = 0;

  constructor(
    private router: Router,
    private platform: Platform,
    private google:GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,

    // private firebase: FirebaseX
  ) { }

  // ngOnInit() {
  // }

  
  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }


  async presentLoading(loading) {
    await loading.present();
  }


   login() {
    
    let params;
    // if (this.platform.is('android')) {
    //   console.log('android')
    //   params = {
    //     // 'scopes': '... ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    //     'webClientId': environment.googleClientID,
    //     'offline': true
    //   }
    // }
    // else {
    //   params = {}
    // }
    params = {
      // 'scopes': '... ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': environment.googleClientID,
      'offline': true
    }

    this.google.login(params)
      .then((response) => {
        
        // const { idToken, accessToken } = response
        const  idToken = response.idToken;
        const  accessToken = response.accessToken;
 
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }

  onLoginSuccess(idToken, accessToken) {

    // const credential = accessSecret ? firebase.auth.GoogleAuthProvider
    //     .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
    //         .credential(accessToken);
    // this.fireAuth.auth.signInWithCredential(credential)
    //   .then((response) => {
    //     this.router.navigate(["/profile"]);
    //     this.loading.dismiss();
    //   })

    var credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    console.log(credential)

// Sign in with credential from the Google user.
    firebase.auth().signInWithCredential(credential)
    .then((response) => {
          this.router.navigate(["/profile"]);
          this.loading.dismiss();
        })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    
    


  }
  onLoginError(err) {
    console.log(err);
  }


  test2(){
    this.google.login({})
  .then(res => {console.log(res);
    
  })
  .catch(err => console.error(err));
  }


  
}
