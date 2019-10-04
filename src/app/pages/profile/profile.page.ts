import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { environment } from '../../../environments/environment';
import * as firebase from "firebase/app";

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { SharingService } from '../../service/sharing.service';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/model/user';

import { AppComponent } from '../../app.component';
import { Gamer } from 'src/app/model/gamer';
import { LocationTracker } from 'src/providers/location-tracker';

import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any = {}
  u: any
  data: any;
  watch: any;

  googleLinked = false;
  fbLinked = false;


  latitude;
  longitude;
  mapType = 'roadmap';

  private channelId = 'UCphmcGUje3ErRaZZuJo-4wQ';
  private channelURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/live_stream?channel=' + this.channelId);
  

  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;

  private itemsCollection: AngularFirestoreCollection<Gamer>;
  items: Observable<Gamer[]>;
  

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private fireAuth: AngularFireAuth,

    private http: HttpClient,
    private afs: AngularFirestore,

    private sharingService: SharingService,
    private userService: UserService,
    private locationTracker: LocationTracker,

    private sanitizer: DomSanitizer
  ) { 

    this.itemDoc = afs.doc<User>('users/aturing');
    this.item = this.itemDoc.valueChanges();

    this.itemsCollection = afs.collection<Gamer>('gamers');
    this.items = this.itemsCollection.valueChanges();
    // this.user = this.sharingService.fetch();
    // console.log(this.user)

    // afs.firestore.doc('/gamers/' + this.user.uid).get()
    // // afs.firestore.collection('users').doc('aturin').get()
    //   .then(docSnapshot => {
    //     if (docSnapshot.exists) {
    //       console.log("doc exist")
    //     } else {
    //       console.log("doc not exist")
    //     }
    //   });
  }

  testShare(){
    // this.sharingService.saveToken("123");
    console.log(this.sharingService.fetchToken());
  }


  getChanel(): Observable<any> {
    var apikey = environment.youtubeAPIkey;
   
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ya29.GlyQB1R9oSywtP29XCVg3rLgisIH32Yh5muFIEETcIDcWjv_mJQ1aqoeFYiWtuXPOVXVG2Kg2mKpL8yEOasofHErM6YFMCluWuMv9M1YYh9C_cy8TCF8C5VEz358Yg'
    })
    return this.http.get("https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=" + "AIzaSyBta6ROxvll02ZK88nIdRm19M7gU08JQ2w" + " HTTP/1.1",
    { headers: reqHeader }   
    );
  }

  testHttp(){  
    var apikey = environment.youtubeAPIkey;
   
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

  }


  ngOnInit() {
    this.getRedirectGoogle();
    
    
    

    let self = this;
    this.fireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        self.user = user;
        
        // console.log(user.providerData)
        user.providerData.forEach((e)=>{
          if (e.providerId=="google.com") {
            self.googleLinked = true;
          } 
          if (e.providerId=="facebook.com") {
            self.fbLinked = true;
          } 
        })
        

        // this.userService.createUser(user);  

        // this.watch = this.locationTracker.getPosition();
        // this.watch.subscribe(position => {
        //   self.latitude = position.coords.latitude;
        //   self.longitude = position.coords.longitude;
        //   // console.log(position.coords.latitude + ' ' + position.coords.longitude);
        //   });
        
          

    // this.afs.firestore.doc('/gamers/' + user.uid).get()
    // // afs.firestore.collection('users').doc('aturin').get()
    //   .then(docSnapshot => {
    //     if (docSnapshot.exists) {
    //       console.log("doc exist")
    //     } else {
    //       console.log("doc not exist")

    //       let gameData: Array<string> = ['League of Legends', 'Arena of Valor', 'PUBG']

    //         let gamer: Gamer = {
    //           uid: user.uid,
    //           displayName: user.displayName,
    //           first: null,
    //           last: null,
    //           middle: null,
    //           email: user.email,
    //           phone: user.phoneNumber,
    //           born: 1,
    //           games: gameData,
    //           location: new firebase.firestore.GeoPoint( self.latitude, self.longitude)
    //           };
    //         // console.log(gamer)
    //       self.itemsCollection.doc(user.uid).set(gamer);

    //     }
    //   });

    // user.providerData.forEach(function (profile) {
    //   console.log("Sign-in provider: " + profile.providerId);
    //   console.log("  Provider-specific UID: " + profile.uid);
    //   console.log("  Name: " + profile.displayName);
    //   console.log("  Email: " + profile.email);
    //   console.log("  Photo URL: " + profile.photoURL);
    // });
     
      }
      else {
        this.router.navigate(["/login"]);
      }
    })
    
    
  }

  getRedirectGoogle(){
    let self = this;
    
    firebase.auth().getRedirectResult()
    .then(function(result) {

      
      if (result.credential) {
        console.log("google redirect!")
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = (<any>result).credential.accessToken;
        var idToken = (<any>result).credential.idToken;
        // ...
        console.log(result)
        // this.sharingService.saveToken(token);


        self.itemDoc.update({
          // googleIdToken: idToken,
          // location: new firebase.firestore.GeoPoint(42.427292, -71.074217)
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
    this.appComponent.u = false;
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
    // console.log(JSON.stringify(this.itemDoc));

    
  // let getDoc = this.itemDoc.get().toPromise()
  // .then(doc => {
  //   if (!doc.exists) {
  //     console.log('No such document!');
  //   } else {
  //     console.log('Document data:', doc.data());
  //   }
  // })
  // .catch(err => {
  //   console.log('Error getting document', err);
  // });
    this.item.subscribe((user: User) => {
      console.log(user);
    })

// collection Usage
    // let data = item.payload.doc.data();
    //     const commentId = item.payload.doc.id;
  }




  
}
