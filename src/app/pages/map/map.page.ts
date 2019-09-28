import { Component, OnInit } from '@angular/core';


import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapsAPILoader } from '@agm/core';
import { SharingService } from 'src/app/service/sharing.service';
import { User } from 'src/app/model/user';
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
    private sharingService: SharingService
    ) { }
  
  user: User;

  latitude = 42.4264867;
  longitude = -71.06760539999999;
  mapType = 'roadmap';
  label = "";


  markers = [];
  filteredMarkers = [];

  ngOnInit() {
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
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }

  getLocations(): Array<{ latitude: number, longitude: number }> {
    return [
      { 'latitude': 42.395147, 'longitude': -71.066963 },
      { 'latitude': 42.395147, 'longitude': -71.067963 },
      { 'latitude': 42.395147, 'longitude': -71.068963 },
    ];
  }
  
}
