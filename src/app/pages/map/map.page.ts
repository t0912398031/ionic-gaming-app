import { Component, OnInit } from '@angular/core';


import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapsAPILoader } from '@agm/core';
import { SharingService } from 'src/app/service/sharing.service';
import { User } from 'src/app/model/user';

import { LocationTracker } from '../../../providers/location-tracker';
declare var google;


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(
    private geolocation: Geolocation,
    private mapsAPILoader: MapsAPILoader,
    private sharingService: SharingService,
    public locationTracker: LocationTracker
    ) { 
      
    }
  
  user: User;
  watch;
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


  getLocations(): Array<{ latitude: number, longitude: number, iconUrl: string }> {
    return [
      { 'latitude': 42.395147, 'longitude': -71.066963, 'iconUrl': './assets/icon/Leagueicon.png'},
      { 'latitude': 42.395147, 'longitude': -71.067963, 'iconUrl': './assets/icon/Leagueicon.png'},
      { 'latitude': 42.395147, 'longitude': -71.068963, 'iconUrl': './assets/icon/Leagueicon.png'},
    ];
  }

  ngOnInit() {
    this.watch = this.locationTracker.getPosition();
    this.watch.subscribe(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      // console.log(position.coords.latitude + ' ' + position.coords.longitude);
      });
  

    this.user = this.sharingService.fetch();
    console.log(this.user)
    this.label = "M"


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

  // Type : "roadmap" | "hybrid" | "satellite" | "terrain" | string

  locate(){
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
  
}
