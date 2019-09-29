
import * as firebase from 'firebase/app'

export class Gamer {
  first: string
  last: string
  middle: string
  born: number
  googleIdToken: string
  location: firebase.firestore.GeoPoint
  
  constructor(
    first: string,
    last: string,
    middle: string,
    born: number,
    googleIdToken: string,
    location: firebase.firestore.GeoPoint
  ) {
    this.first = first, 
    this.last = last,
    this.middle = middle, 
    this.born = born, 
    this.googleIdToken = googleIdToken,
    this.location = location

  }

}
