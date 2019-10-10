import { Injectable, } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { Gamer } from 'src/app/model/gamer';
import * as firebase from "firebase/app";
import { LocationTracker } from 'src/providers/location-tracker';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class UserService {

    private user;
    

    private watch;
    private latitude;
    private longitude;

    private gamerDoc: AngularFirestoreDocument<Gamer>;
    private gamer: Observable<Gamer>;

    getCurrentUser(){
        return this.user;
    }

    getGamerDoc(){
        return this.gamerDoc;
    }
    getGamer(){
        return this.gamer;
    }

 

    private itemsCollection: AngularFirestoreCollection<Gamer>;
    private items: Observable<Gamer[]>;


    constructor(
        private router: Router,
        private fireAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private locationTracker: LocationTracker
    ) {
        this.itemsCollection = afs.collection<Gamer>('gamers');
        this.items = this.itemsCollection.valueChanges();

    
        // this.watch = this.locationTracker.getWatch();

        let self = this;
        this.fireAuth.auth.onAuthStateChanged(user => {
            if (user) {
                this.user = user;
                // console.log(this.user)

                this.gamerDoc = afs.doc<Gamer>('gamers/' + this.user.uid);
                this.gamer = this.gamerDoc.valueChanges();

                // Get Gamer g
                this.gamerDoc.ref.get().then((doc)=> {
                    if (doc.exists) {
                        // console.log("Document data:", doc.data());

                        // Theme Preference
                        document.body.classList.toggle(doc.data().theme, true);
                        // self.g = doc.data();
                    } else {
                        console.log("No such document!");
                    }
                    }).catch(function(error) {
                    console.log("Error getting document:", error);
                });

            }
            else {
                this.router.navigate(["/login"]);
            }
        })
    }

    getUserDoc(uid: string){
        return this.afs.doc<Gamer>('gamers/' + uid);
    }
    
    createUser(user) {
        this.user = user;
        this.afs.firestore.doc('/gamers/' + user.uid).get()
            // afs.firestore.collection('users').doc('aturin').get()
            .then(docSnapshot => {
                if (docSnapshot.exists) {
                    console.log("doc exist")
                    
                } else {
                    console.log("doc not exist")

                    let gameInfo = {
                        gameName: 'League of Legends',
                        server: 'NA',
                        gameId: 't0912398031',
                        experience: 2,
                        rank: 'master',
                        role: ['mid','adc'],
    
                    };

                    let gameData: Array<Object> = 
                    [
                        {
                          name: 'Minecraft',
                          isChecked: false,
                        },
                        {
                          name: 'League of Legends',
                          isChecked: true,
                          gameInfo: gameInfo
                        },
                        {
                          name: 'PUBG',
                          isChecked: false,
                        },
                        {
                          name: 'Arena of Valor',
                          isChecked: false,
                        }  
                    ]

                    
                    let latitude = this.locationTracker.getLatitude();
                    let longitude = this.locationTracker.getLongitude();

                    let gamer: Gamer = {
                        uid: user.uid,
                        displayName: user.displayName,
                        first: null,
                        last: null,
                        middle: null,
                        gender: 'male',
                        email: user.email,
                        phone: user.phoneNumber,
                        born: 1,
                        games: gameData,
                        // gameInfo: gameInfo,
                        location: new firebase.firestore.GeoPoint(latitude, longitude),
                        theme:'dark'
                    };
                    // console.log(gamer)
                    this.itemsCollection.doc(user.uid).set(gamer)
                    .catch(err => {
                        console.log("create user fail" );
                    });
                    console.log("create user successfully")
                    // this.watch.unsubscribe();
                }
            });



    }


    updateUser(user) {
        
        let self = this;
        this.afs.firestore.doc('/gamers/' + user.uid).get()
            // afs.firestore.collection('users').doc('aturin').get()
            .then(docSnapshot => {
                if (docSnapshot.exists) {
                    console.log("doc exist")


                    let gameInfo = {
                        gameName: 'League of Legends',
                        server: 'NA',
                        gameId: 't0912398031',
                        experience: 2,
                        rank: 'platnium',
                        role: ['mid','adc'],
    
                    };

                    this.itemsCollection.doc(user.uid).update({
                        gameInfo: gameInfo
                    })
                    .catch(err => {
                        console.log("update user fail" );
                    });
                    console.log("update user suceed" );


                } else {
                    console.log("doc not exist")                  
                }
            });



    }

    updateUserLocation() {
        this.locationTracker.getWatch().subscribe(position => {
            // this.latitude = position.coords.latitude;
            // this.longitude = position.coords.longitude;
            // console.log(position.coords.latitude + ' ' + position.coords.longitude);
            // this.userService.updateUserLocation(position.coords.latitude, position.coords.longitude)
      
            this.gamerDoc.update({
                location: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude),
              })
      
        });
        
    //     // let self = this;
    //     this.afs.firestore.doc('/gamers/' + user.uid).get()
    //         // afs.firestore.collection('users').doc('aturin').get()
    //         .then(docSnapshot => {
    //             if (docSnapshot.exists) {
    //                 console.log("doc exist")


    //                 let gameInfo = {
    //                     gameName: 'League of Legends',
    //                     server: 'NA',
    //                     gameId: 't0912398031',
    //                     experience: 2,
    //                     rank: 'platnium',
    //                     role: ['mid','adc'],
    
    //                 };

    //                 this.itemsCollection.doc(user.uid).update({
    //                     gameInfo: gameInfo
    //                 })
    //                 .catch(err => {
    //                     console.log("update user fail" );
    //                 });
    //                 console.log("update user suceed" );


    //             } else {
    //                 console.log("doc not exist")                  
    //             }
    //         });



    }


}
