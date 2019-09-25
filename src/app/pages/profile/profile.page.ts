import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from "firebase/app";

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

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
    private afs: AngularFirestore
  ) { 

    this.itemDoc = afs.doc<User>('users/aturing');
    this.item = this.itemDoc.valueChanges();
  }

  ngOnInit() {

    this.fireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        console.log(firebase.auth().currentUser);
    console.log(this.fireAuth.auth.currentUser);
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
