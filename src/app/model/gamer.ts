
import * as firebase from 'firebase/app'
import { ArrayType } from '@angular/compiler'

export class Gamer {
  uid: string
  displayName: string
  first: string
  last: string
  middle: string
  gender: string
  email: string
  phone: string
  born: number
  games: Array<Object>
  // gameInfo: Object
  // googleIdToken: string
  location: firebase.firestore.GeoPoint
  theme: string
  
  constructor(
    uid: string,
    displayName: string,
    first: string,
    last: string,
    middle: string,
    gender: string,
    email: string,
    phone: string,
    born: number,
    games: Array<Object>,
    // gameInfo: Object,
    // googleIdToken: string,
    location: firebase.firestore.GeoPoint,
    theme: string
  ) {
    this.uid = uid;
    this.displayName = displayName;
    this.first = first; 
    this.last = last;
    this.middle = middle;
    this.gender = gender;
    this.email = email;
    this.phone = phone; 
    this.born = born; 
    this.games = games;
    // this.gameInfo = gameInfo;
    // this.googleIdToken = googleIdToken,
    this.location = location;
    this.theme = theme

  }

}
