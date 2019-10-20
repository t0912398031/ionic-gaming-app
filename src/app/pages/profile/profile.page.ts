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

  user;
  u: any
  data: any;
  watch: any;
  gender = 'male';
  games;

  googleLinked = false;
  fbLinked = false;


  latitude;
  longitude;
  mapType = 'roadmap';

  private cardContent = '7 years League of Legends experience, 1 year Arena of Valor. Ranked top 1 NA in season 11';
  private isEdit = false;
  isEditable = false;
  description = '123'

  private channelId = 'UCphmcGUje3ErRaZZuJo-4wQ';
  channelURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/live_stream?channel=' + this.channelId);
  
  private gamerDoc: AngularFirestoreDocument<Gamer>;
  gamer: Observable<Gamer>;


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
    this.user = this.userService.getCurrentUser();

    // this.itemsCollection = afs.collection<Gamer>('gamers');
    // this.items = this.itemsCollection.valueChanges();

    this.gamerDoc = this.userService.getGamerDoc();
    this.gamer = this.gamerDoc.valueChanges();

    this.gamer.subscribe((gamer: Gamer)=>{
      this.gender = gamer.gender;
      this.games = gamer.games;
      
    })
    
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


  getimg(game){
    let text = ''
    switch(game) {
      case "League of Legends":
        text = "assets/icon/Leagueicon.png";
        break;
      case "Arena of Valor":
        text = 'assets/icon/Aov.jpg';
        break;
      case "Apple":
        text = "How you like them apples?";
        break;
      default:
        text = './assets/icon/favicon.png';
  }
    return text
  }

  editable(){
    this.isEditable = !this.isEditable;
    console.log(this.isEditable)
    // return !this.isEditable
  }
  
}
