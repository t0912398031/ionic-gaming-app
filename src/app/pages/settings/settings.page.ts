import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Gamer } from 'src/app/model/gamer';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from "firebase/app";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private user;
  toggle;
  private gamerDoc: AngularFirestoreDocument<Gamer>;
  private gamer: Observable<Gamer>;

  googleLinked;
  fbLinked;

  constructor(
    private userService:UserService,
    private afs: AngularFirestore,
    private fireAuth: AngularFireAuth
    ) { 
    this.gamerDoc = this.userService.getGamerDoc();

    this.gamer = this.gamerDoc.valueChanges();
    let self = this;
    this.gamer.subscribe((gamer: Gamer)=>{
      // self.g = gamer;
      self.toggle = gamer.theme =='dark'? true:false;


    })
    
  }

  test(){

    console.log(this.toggle)
  }
  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    // console.log(user.providerData[0].uid)
    this.user.providerData.forEach((e)=>{
      if (e.providerId=="google.com") {
        this.googleLinked = true;
      } 
      if (e.providerId=="facebook.com") {
        this.fbLinked = true;
      } 
    })
  }


  enableDark(){
    document.body.classList.toggle('dark', this.toggle);
    if(this.toggle){
      this.gamerDoc.update({
        theme: 'dark',     
      });
    } else{
      this.gamerDoc.update({
        theme: 'default',    
      });
    }
    
  }
  linkGoogle(){}
  linkFb(){
    // Creates the provider object.
    var provider = new firebase.auth.FacebookAuthProvider();
    // var provider = new firebase.auth.GoogleAuthProvider();

    // You can add additional scopes to the provider:
    // provider.addScope('email');
    // provider.addScope('user_friends');

    this.fireAuth.auth.currentUser.linkWithRedirect(provider);


    // Link with popup:

 
    // this.fireAuth.auth.currentUser.linkWithPopup(provider).then(function(result) {
    //   console.log("successfully linked");
    //   // The firebase.User instance:
    //   var user = result.user;
    //   // The Facebook firebase.auth.AuthCredential containing the Facebook
    //   // access token:
    //   var credential = result.credential;
    // }, function(error) {
    //   // An error happened.
    // });



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

  unlink(provider){
  

    this.user.unlink(provider).then(function() {
      // Auth provider unlinked from account
      console.log('Auth provider unlinked from account')

      if (provider=="google.com") {
        this.googleLinked = false;
      } 
      if (provider=="facebook.com") {
        this.fbLinked = false;
      } 
    }).catch(function(error) {
      // An error happened
      console.log(error)
    });

  }

  

}
