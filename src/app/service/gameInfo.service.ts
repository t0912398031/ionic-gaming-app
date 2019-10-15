// import { Injectable, } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { Gamer } from 'src/app/model/gamer';
// import * as firebase from "firebase/app";
// import { LocationTracker } from 'src/providers/location-tracker';

// @Injectable()
// export class UserService {

//     private watch;
//     private latitude;
//     private longitude;

//     private itemsCollection: AngularFirestoreCollection;
//     items: Observable<any>;

//     constructor(
//         private afs: AngularFirestore,
//         // private locationTracker: LocationTracker
//     ) {
//         this.itemsCollection = afs.collection('gamers');
//         this.items = this.itemsCollection.valueChanges();
//     }

//     createGameInfo(user) {
//         // let self = this;
//         this.afs.firestore.doc('/gameInfo/' + user.uid).get()
//             // afs.firestore.collection('users').doc('aturin').get()
//             .then(docSnapshot => {
//                 if (docSnapshot.exists) {
//                     console.log("doc exist")
//                 } else {
//                     console.log("doc not exist")

//                     let gameInfo = {
//                         gameName: 'League of Legends',
//                         server: 'NA',
//                         gameId: 't0912398031',
//                         experience: 2,
//                         rank: 'master',
//                         role: ['mid','adc'],
 
//                     };
//                     // // console.log(gamer)
//                     // this.itemsCollection.doc(user.uid).set(gameInfo)
//                     // .catch(err => {
//                     //     console.log("create gameInfo fail" );
//                     // });
//                     // console.log("create gameInfo successfully")
//                     // // this.watch.unsubscribe();



//                     // Add a new document with a generated id.
//                     this.itemsCollection.add(gameInfo).then(ref => {
//                         console.log('Added document with ID: ', ref.id);
//                     });
  
//                 }
//             });



//     }

// }
