import { Injectable, NgZone } from '@angular/core';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
// import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

// import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTracker {

  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;
  public latitude;
  public longitude;

  gps_update_link: string = "replace_with_your_http_request_link";
  constructor(
    //   public zone: NgZone,
      private backgroundGeolocation: BackgroundGeolocation,
      private geolocation: Geolocation
    
    ) {

  }

  startTracking() {
    console.log("start")

    // Background Tracking

    let config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 10, 
        debug: true,
        interval: 2000,
        stopOnTerminate: false // enable this to clear background location settings when the app terminates 
      };


      this.backgroundGeolocation.configure(config)
      .then(() => {
    
        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);
          this.lat = location.latitude;
          this.lng = location.longitude;
          this.sendGPS(location);
          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });
    
      });
    


  
    //   this.backgroundGeolocation.configure(config).subscribe((location) => {
  
    //     console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
  
    //     // Run update inside of Angular's zone
    //     this.zone.run(() => {
    //       this.lat = location.latitude;
    //       this.lng = location.longitude;
    //     });
  
    //   }, (err) => {
  
    //     console.log(err);
  
    //   });
  
    //   // Turn ON the background-geolocation system.
    //   this.backgroundGeolocation.start();
  
  
    //   // Foreground Tracking
  
    // let options = {
    //   frequency: 3000, 
    //   enableHighAccuracy: true
    // };
  
    // this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
  
    //   console.log(position);
  
    //   // Run update inside of Angular's zone
    //   this.zone.run(() => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //   });
  
    // });


  }

  stopTracking() {

    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }



  sendGPS(location) {
    // if (location.speed == undefined) {
    //   location.speed = 0;
    // }
    // let timestamp = new Date(location.time);

    // this.http
    //   .post(
    //     this.gps_update_link, // backend api to post
    //     {
    //       lat: location.latitude,
    //       lng: location.longitude,
    //       speed: location.speed,
    //       timestamp: timestamp
    //     },
    //     {}
    //   )
    //   .then(data => {
    //     console.log(data.status);
    //     console.log(data.data); // data received by server
    //     console.log(data.headers);
    //     this.backgroundGeolocation.finish(); // FOR IOS ONLY
    //   })
    //   .catch(error => {
    //     console.log(error.status);
    //     console.log(error.error); // error message as string
    //     console.log(error.headers);
    //     this.backgroundGeolocation.finish(); // FOR IOS ONLY
    //   });
  }

startTrackingWeb(){
  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
    // console.log(resp.coords.latitude)
    // console.log(resp.coords.longitude)
   }).catch((error) => {
     console.log('Error getting location', error);
   });

   this.watch = this.geolocation.watchPosition();
   return this.watch;
  //  watch.subscribe((data) => {
  //   // data can be a set of coordinates, or an error (if an error occurred).
  //   // data.coords.latitude
  //   // data.coords.longitude
  //  });
  }

  getPosition(){
    return this.watch;
  }
  
  
}