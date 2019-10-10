import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import * as firebase from 'firebase';
import { LocationTracker } from 'src/providers/location-tracker';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
      private location: Location,
      private locationTracker: LocationTracker) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        // console.log("route: " + route);
        if(route.url.toString()=='map'){
            if(!this.locationTracker.tracking){
                this.router.navigate(['']);
                return false;
            }
        }
        if(route.url.toString()=='gameinfo'){
          if(!this.router.getCurrentNavigation().extras.state.gameInfo){
            // console.log(this.router.getCurrentNavigation().extras.state.gameInfo)
            
            // this.location.back();
            // route.queryParams
            // .subscribe(params => {
            //   // Defaults to 0 if no query param provided.
            //   uid = params['state'] || 0;
            // });
            // this.router.navigate(['/userprofile', uid]);
            // this.navCtrl.navigateBack('/userprofile')
              // this.router.navigate(['']);
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