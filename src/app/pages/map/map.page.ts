import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import { MapsAPILoader } from '@agm/core';
import { SharingService } from 'src/app/service/sharing.service';
import { User } from 'src/app/model/user';

import { LocationTracker } from '../../../providers/location-tracker';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';

declare var google;


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit{

  user: User;
  private watch: Observable<Geoposition>;
  latitude;
  longitude;
  mapType = 'roadmap';
  label = "";
  iconUrl = {
    url: './assets/icon/favicon.png',
    scaledSize: {
        width: 40,
        height: 40
    }
  }

  markers = [];
  filteredMarkers = [];

  constructor(
    private geolocation: Geolocation,
    private mapsAPILoader: MapsAPILoader,
    private sharingService: SharingService,
    private userService: UserService,
    public locationTracker: LocationTracker,
    private router: Router
    ) { 
      // this.locationTracker.getPosition().then((resp) => {
      //   this.latitude = resp.coords.latitude;
      //   this.longitude = resp.coords.longitude;
      //    }).catch((error) => {
      //      console.log('Error getting location', error);
      //    });
      // this.watch = this.geolocation.watchPosition();
      // this.watch.subscribe(position => {
      //     this.latitude = position.coords.latitude;
      //     this.longitude = position.coords.longitude;
    
    
      // });

  
      this.latitude = this.locationTracker.getLatitude();
      this.longitude = this.locationTracker.getLongitude();
  
      // this.user = this.sharingService.fetch();
      // console.log(this.user)
      this.label = "Me"
  
  
      this.markers = this.getLocations();
  
      this.mapsAPILoader.load().then(() => {
        const center = new google.maps.LatLng(this.latitude, this.longitude);
        this.filteredMarkers = this.markers.filter(m => {
          const markerLoc = new google.maps.LatLng(m.latitude, m.longitude);
          const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000;
          if (distanceInKm < 150.0){
          // if (distanceInKm < 0.5){
            return m;
          }
        });
      });
    }
  
  


  getLocations(): Array<{uid: string, latitude: number, longitude: number, iconUrl: string }> {
    // let citiesRef = db.collection('cities');
    // let query = citiesRef.where('latitude', '==', 'CA').where('population', '<', 1000000).get()
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
  

    return [
      { 'uid': 'TMDz1cVAM7QagTPsU5aIJtlRzs52', 'latitude': 42.4165744, 'longitude': -71.066963, 'iconUrl': './assets/icon/Leagueicon.png'},
      { 'uid': 'tF96P4qpFLVfKhxukQ8iOCeq4P72', 'latitude': 42.395147, 'longitude': -71.067963, 'iconUrl': './assets/icon/Leagueicon.png'},
      { 'uid': '3', 'latitude': 42.395147, 'longitude': -71.068963, 'iconUrl': './assets/icon/Leagueicon.png'},
    ];
  }
  // ngOnDestroy(){
  //   this.watch.unsubscribe();
  // }

  ngOnInit() {

    // this.locationTracker.getPosition().then((resp) => {
    //   this.latitude = resp.coords.latitude;
    //   this.longitude = resp.coords.longitude;
    //    }).catch((error) => {
    //      console.log('Error getting location', error);
    //    });

    // this.watch = this.locationTracker.getWatch().subscribe(position => {
    //   this.latitude = position.coords.latitude;
    //   this.longitude = position.coords.longitude;
    //   // console.log(position.coords.latitude + ' ' + position.coords.longitude);
    //   // this.userService.updateUserLocation(position.coords.latitude, position.coords.longitude)

    // });

    // // this.latitude = this.locationTracker.getLatitude();
    // // this.longitude = this.locationTracker.getLongitude();

    // // this.user = this.sharingService.fetch();
    // // console.log(this.user)
    // this.label = "Me"


    // this.markers = this.getLocations();

    // this.mapsAPILoader.load().then(() => {
    //   const center = new google.maps.LatLng(this.latitude, this.longitude);
    //   this.filteredMarkers = this.markers.filter(m => {
    //     const markerLoc = new google.maps.LatLng(m.latitude, m.longitude);
    //     const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000;
    //     if (distanceInKm < 150.0){
    //     // if (distanceInKm < 0.5){
    //       return m;
    //     }
    //   });
    // });
  }

  // Type : "roadmap" | "hybrid" | "satellite" | "terrain" | string
  create(){
    this.userService.createPoint('TMDz1cVAM7QagTPsU5aIJtlRzs52', 'Pang', this.latitude, this.longitude);
  
  }
  locate(){
    // this.userService.createPoint('TMDz1cVAM7QagTPsU5aIJtlRzs52', 'Pang', this.latitude, this.longitude);
    this.userService.getGamersByRange(1,2,3);
    
    
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   this.latitude = resp.coords.latitude;
    //   this.longitude = resp.coords.longitude;
    //   // console.log(resp.coords.latitude)
    //   // console.log(resp.coords.longitude)
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });

    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //  });
    // this.watch.filter((p) => p.coords !== undefined) //Filter Out Errors

  }

  





  start(){
    // this.locationTracker.startTracking();
  }

  stop(){
    // this.locationTracker.stopTracking();
  }

  onViewDetails(id){
    // console.log(id)
    this.router.navigate(['/userprofile', id]);
  }
  
}
