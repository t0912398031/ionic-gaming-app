import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import * as firebase from 'firebase';
import { LocationTracker } from 'src/providers/location-tracker';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private locationTracker: LocationTracker) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        // console.log("route: " + route);
        if(route.url.toString()=='map'){
            if(!this.locationTracker.tracking){
                this.router.navigate(['']);
                return false;
            }
        }



        // let authInfo = {
        //     authenticated: false
        // };
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
              console.log("user exist");
            }
            else {
              console.log("no user found");
              this.router.navigate(['login']);
              return false;
              
            }
          })
          return true;





        // if (!authInfo.authenticated) {
        //     this.router.navigate(['login']);
        //     return false;
        // }

        // return true;

    }

}