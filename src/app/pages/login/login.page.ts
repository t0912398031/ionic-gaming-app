import { Component, OnInit } from '@angular/core';

import * as firebase from "firebase/app";

import { SharingService } from '../../service/sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private sharingService: SharingService
  ) { }

  ngOnInit() {
  }

  firebaseGoogleSigninSDK(){
    
    var provider = new firebase.auth.GoogleAuthProvider();

    // Optional: Specify additional OAuth 2.0 scopes that you want to request from the authentication provider. To add a scope, call addScope.
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.addScope('https://www.googleapis.com/auth/youtube.readonly');
    
    // firebase.auth().languageCode = 'pt';

    // To apply the default browser preference instead of explicitly setting it.
    // firebase.auth().useDeviceLanguage();
    provider.setCustomParameters({
      // 'login_hint': 'user@example.com'
      // 'access_type': 'offline',
      // 'include_granted_scopes': 'true',
      // 'response_type':'code'

      access_type: 'offline',
      state: 'state_parameter_passthrough_value',
      include_granted_scopes: 'true',
      response_type: 'code'
    });
    // To sign in by redirecting to the sign-in page, call signInWithRedirect
    firebase.auth().signInWithRedirect(provider);

    // firebase.auth().getRedirectResult().then(function(result) {
    //   // console.log((<any>result).code)
    //   console.log(result)
    //   if (result.credential) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     // var token = result.credential.accessToken;
    //     // ...
    //   }
    //   // The signed-in user info.
    //   // var user = result.user;
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });



    // Then, you can also retrieve the Google provider's OAuth token by calling getRedirectResult when your page loads:
    // firebase.auth().getRedirectResult()
    // // firebase.auth().signInWithPopup(provider)
    // .then(function(result) {
    //   if (result.credential) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = (<any>result).credential.accessToken;
    //     var idToken = (<any>result).credential.getIdTokens;
    //     // ...

    //     console.log(token);
    //     console.log(idToken);
    //     this.sharingService.saveToken("token");
    //   }
    //   // The signed-in user info.
    //   var user = result.user;
    //   // console.log(user);
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
  }



  firebaseFbSigninSDK(){
    
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider);

    // Then, you can also retrieve the Google provider's OAuth token by calling getRedirectResult when your page loads:
    firebase.auth().getRedirectResult()
    // firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = (<any>result).credential.accessToken;
        
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      // console.log(user);
    }).catch(function(error) {
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
  

  firebaseCordova(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(function() {
      return firebase.auth().getRedirectResult();
    }).then(function(result) {
      // This gives you a Google Access Token.
      // You can use it to access the Google API.
      var token = (<any>result).credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }


// ionicfirebase(){
  //   this.firebase.getToken()
  // .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
  // .catch(error => console.error('Error getting token', error));

  // this.firebase.onNotificationOpen()
  //   .subscribe(data => console.log(`User opened a notification ${data}`));

  // this.firebase.onTokenRefresh()
  //   .subscribe((token: string) => console.log(`Got a new token ${token}`));
  // }

  


  
}
