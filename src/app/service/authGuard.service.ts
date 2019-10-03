import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        console.log("route: " + route);




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