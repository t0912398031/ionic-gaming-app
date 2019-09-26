import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { environment } from '../../../environments/environment';
import * as firebase from "firebase/app";

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { SharingService } from '../../service/sharing.service';

// export interface User {
  export interface User {
  first: string,
  last: string,
  middle: string,
  born: number
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {}
  u: any
  data: any;

  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;
  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,

    private http: HttpClient,
    private afs: AngularFirestore,

    private sharingService: SharingService
  ) { 

    this.itemDoc = afs.doc<User>('users/aturing');
    this.item = this.itemDoc.valueChanges();
  }

  testShare(){
    // this.sharingService.saveToken("123");
    console.log(this.sharingService.fetchToken());
  }


  getChanel(): Observable<any> {
    var apikey = environment.firebaseConfig.apiKey;
   
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ya29.GlyQB1R9oSywtP29XCVg3rLgisIH32Yh5muFIEETcIDcWjv_mJQ1aqoeFYiWtuXPOVXVG2Kg2mKpL8yEOasofHErM6YFMCluWuMv9M1YYh9C_cy8TCF8C5VEz358Yg'
    })
    return this.http.get("https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=" + "AIzaSyBta6ROxvll02ZK88nIdRm19M7gU08JQ2w" + " HTTP/1.1",
    { headers: reqHeader }   
    );
  }
  testHttp(){
    // var ob = this.getChanel();
    // ob.subscribe((data: any) => {
    //   if (data.length == 0) {
    //     alert("Wrong credentials!");
    //   }
    //   else {
    //     console.log(data);
    //   }
    // })

    
    var apikey = environment.firebaseConfig.apiKey;
   
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'ya29.GlyQB0tDzQWapMLI5jhMTNUZFOceTSeKvAEmPrs8SWjt8R86mEhINUzaLaaM2_6vPJLLLA8McPA0tEZFl0u-Q_kZ-MS6WOwfiQI-LM65w5eY05RKWPzTvvWHE6A7yg'
    })
    this.http.get("https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=" + apikey + " HTTP/1.1",
    {
      headers: reqHeader
    }   
    ).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });


    // 
    // this.http.post("https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=" + apikey + "HTTP/1.1",
    // {
    //     "Authorization": "Bearer " + "ya29.GlyQB1R9oSywtP29XCVg3rLgisIH32Yh5muFIEETcIDcWjv_mJQ1aqoeFYiWtuXPOVXVG2Kg2mKpL8yEOasofHErM6YFMCluWuMv9M1YYh9C_cy8TCF8C5VEz358Yg"
    //     //  this.sharingService.fetchToken()
    //     // "courseListIcon": "...",
    //     // "description": "TEST",
    //     // "iconUrl": "..",
    //     // "longDescription": "...",
    //     // "url": "new-url"
    // })
    // .subscribe(
    //     (val) => {
    //         console.log("POST call successful value returned in body", 
    //                     val);
    //     },
    //     response => {
    //         console.log("POST call in error", response);
    //     },
    //     () => {
    //         console.log("The POST observable is now completed.");
    //     });

  }


  ngOnInit() {
    this.getRedirectGoogle();
    
    // this.sharingService.fetchToken().then((e) => {
    //   console.log(e);
    // })

    this.fireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // console.log(user.providerData)
        // console.log(user.metadata)

    //     console.log(firebase.auth().currentUser);
    // console.log(this.fireAuth.auth.currentUser);

    // user.providerData.forEach(function (profile) {
    //   console.log("Sign-in provider: " + profile.providerId);
    //   console.log("  Provider-specific UID: " + profile.uid);
    //   console.log("  Name: " + profile.displayName);
    //   console.log("  Email: " + profile.email);
    //   console.log("  Photo URL: " + profile.photoURL);
    // });
        this.u = user;
        // console.log(this.u);
        this.user = {
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

      }
      else {
        this.router.navigate(["/login"]);
      }
    })

    
  }

  getRedirectGoogle(){
    firebase.auth().getRedirectResult()
    // firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = (<any>result).credential.accessToken;
        // ...

        console.log(token);
        this.sharingService.saveToken(token);

        this.itemDoc.update({
          accessToken: token
        });
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

  logout() {
    this.fireAuth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    })
  }

  linkFb(){
    // Creates the provider object.
    var provider = new firebase.auth.FacebookAuthProvider();
    // You can add additional scopes to the provider:
    // provider.addScope('email');
    // provider.addScope('user_friends');

    // auth.currentUser.linkWithRedirect(provider);
    // Link with popup:

    // firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
    this.fireAuth.auth.currentUser.linkWithPopup(provider).then(function(result) {
      console.log("successfully linked");
      // The firebase.User instance:
      var user = result.user;
      // The Facebook firebase.auth.AuthCredential containing the Facebook
      // access token:
      var credential = result.credential;
    }, function(error) {
      // An error happened.
    });

    // firebase.auth().getRedirectResult().then(function(result) {
    //   if (result.credential) {
        
    //     // Accounts successfully linked.
    //     var credential = result.credential;
    //     var user = result.user;
    //     // ...
    //   }
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   // ...
    // });
  }
  


  get() {
    var ob = this.getUsers();
    ob.subscribe((data: any) => {
      if (data.length == 0) {
        alert("Wrong credentials!");
      }
      else {
        console.log(data);
      }
    })
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://gamer-republic-253301.firebaseio.com/users/aturing.json');
  }


  testupdate(){
    
    this.itemDoc.update({
      last: this.data
    });
    
    // this.update()
  }

  // Method
  update(item: User){
    this.itemDoc.update(item);
  }
}
