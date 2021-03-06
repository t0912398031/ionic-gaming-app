import { Injectable, } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { first, take } from 'rxjs/operators';
import { Gamer } from 'src/app/model/gamer';
import * as firebase from "firebase/app";
import { LocationTracker } from 'src/providers/location-tracker';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import * as geofirex from 'geofirex';
import { toGeoJSON } from 'geofirex'

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

    getUserDoc(uid: string){
        return this.afs.doc<Gamer>('gamers/' + uid);
    }

    getGamerDoc(){
        return this.gamerDoc;
    }
    getGamer(){
        return this.gamer;
    }

    

    private gamersCollection: AngularFirestoreCollection<Gamer>;
    private gamers: Observable<Gamer[]>;

    geo = geofirex.init(firebase);
    points: Observable<any>;

    constructor(
        private router: Router,
        private fireAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private locationTracker: LocationTracker
    ) {
        this.gamersCollection = afs.collection<Gamer>('gamers');
        this.gamers = this.gamersCollection.valueChanges();
        // this.watch = this.locationTracker.getWatch();

        let self = this;
        this.fireAuth.auth.onAuthStateChanged(user => {
            if (user) {
                this.user = user;
                this.locationTracker.startTrackingWeb();
                // console.log(this.user)

                // this.gamerDoc = afs.doc<Gamer>('gamers/' + this.user.uid);
                // this.gamer = this.gamerDoc.valueChanges();
                this.afs.doc<Gamer>('gamers/' + this.user.uid).ref.get()
                .then((doc)=> {
                    if (doc.exists) {

                        // Theme Preference
                        document.body.classList.toggle(doc.data().theme, true);
                    } else {
                        console.log("No such document!");
                        this.createUser(user);
                    }
                    }).catch(function(error) {
                    console.log("Error getting document:", error);
                });

                this.gamerDoc = afs.doc<Gamer>('gamers/' + this.user.uid);
                this.updateUserLocation();
                this.router.navigate(["/profile"]);
            }
            else {
                console.log('no firebase user')
                this.router.navigate(["/login"]);
            }
        })
    }

    
    
    createUser(user) {
        // this.user = user;

        // this.afs.firestore.doc('/gamers/' + user.uid).get()
        //     .then(docSnapshot => {
        //         if (docSnapshot.exists) {
        //             console.log("doc exist")
        //         } else {
        //             console.log("doc not exist")

                    // let gameInfo = {
                    //     gameName: 'League of Legends',
                    //     server: 'NA',
                    //     gameId: 't0912398031',
                    //     experience: 2,
                    //     rank: 'master',
                    //     role: ['mid','adc'],
    
                    // };

                    let gameData: Array<Object> = 
                    [
                        {
                          name: 'Minecraft',
                          isChecked: false,
                        },
                        {
                          name: 'League of Legends',
                          isChecked: true,
                        //   gameInfo: gameInfo
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

                    this.gamersCollection.doc(user.uid).set(gamer)
                    .catch(err => {
                        console.log("create user fail" );
                    });
                    
                    console.log("create user successfully")
                    this.gamerDoc = this.afs.doc<Gamer>('gamers/' + user.uid);
                    this.gamerDoc.collection('gameInfo').add({test: 'test'});
            //     }
            // });


            // this.gamerDoc = this.afs.doc<Gamer>('gamers/' + this.user.uid);
    }


    // updateUser(user) {
        
    //     let self = this;
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

    //                 this.gamersCollection.doc(user.uid).update({
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
    // }

    getGameInfoDoc(game: string){

        this.gamerDoc.collection('gameInfo').doc(game).ref.get()
            .then(docSnapshot => {
                if (docSnapshot.exists) {
                    console.log("gameInfodoc exist")
                } else {
                    console.log("gameInfodoc not exist")

                    let gameInfo = {
                        gameName: game,
                        server: null,
                        gameId: '',
                        experience: null,
                        rank: null,
                        role: null,                 
                      };
                    this.gamerDoc.collection('gameInfo').doc(game).set(gameInfo)
                    console.log('create gameInfodoc success')
                }
            })
        return this.gamerDoc.collection('gameInfo').doc(game);
    }

    updateGameInfo(game, gameInfo) {
        // this.gamerDoc.collection('gameInfo').doc(game).set(gameInfo)
        this.gamerDoc.collection('gameInfo').doc(game).update(gameInfo)
    }

    getGameInfoDocByUser(uid: string, game: string){
        // let gameInfoDoc = this.gamersCollection.doc(uid).collection('gameInfo').doc(game);
        // gameInfoDoc.ref.get()
        //     .then(docSnapshot => {
        //         if (docSnapshot.exists) {
        //             console.log("gameInfodoc exist")
                    
        //         } else {
        //             console.log("gameInfodoc not exist")

        //         }
        //     })
        // return gameInfoDoc;

        return this.gamersCollection.doc(uid).collection('gameInfo').doc(game);
    }
 
    updateUserLocation() {
        this.locationTracker.getWatch().subscribe(position => {

            this.gamerDoc.update({
                location: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude),
              })
      
        });

    }
    createPoint(uid, displayName, lat, lng) {
        let collection = this.geo.collection('locations')
    
        // Use the convenience method
        // uid = '123';
        // displayName = 'Pang'
        // // collection.setPoint('my-place', 38,-119)
        // collection.setPoint(uid, displayName, 80, 0)

    
        // Or be a little more explicit 
        const point = this.geo.point(0, 0)
        collection.setDoc('my-place7', { position: point.data })
        // collection.add({name: 'my-place2',  position: point.data });
      }

    getGamersByRange(lat, lon, range){
        
    // let maxlat = lat+range;
    // let minlat = lat-range;
    // let maxlon = lon+range;
    // let minlon = lon-range;
    //     let query = this.gamersCollection.ref.where('location', '<', 'CA').where('population', '<', 1000000).get()
    //   .then(snapshot => {
    //     if (snapshot.empty) {
    //       console.log('No matching documents.');
    //       return;
    //     }  
    
    //     snapshot.forEach(doc => {
    //       console.log(doc.id, '=>', doc.data());
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Error getting documents', err);
    //   });

    const collection = this.geo.collection('locations')
    collection.data().subscribe(data =>
        console.log(data)
    )
    // collection.snapshot().subscribe(data =>
    //     console.log(data)
    // )
  
    const center = this.geo.point(0, 0);
    const radius = 100;
    const field = 'position';

    this.points = collection.within(center, radius, field);

    this.points.subscribe(console.log)

    // const query = this.geo.collection('locations').within(center, radius, field)
    // this.points = query.pipe( toGeoJSON('point') )
    
    }


}
