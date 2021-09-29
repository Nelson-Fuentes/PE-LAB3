import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

declare var google: any; // to keep away from errors like "google dosn't exist"

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage {

  map: any;

  @ViewChild('map',{read:ElementRef,static:false}) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [];

  //dataComming: any;

  constructor(private route: ActivatedRoute) {
    this.markers = JSON.parse(this.route.snapshot.params["data"]);
  }

  addMarkersToApp(markers){
    for(let marker of markers){
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowsToMarker(mapMarker);
    }
  }

  addInfoWindowsToMarker(mapMarker){
    let infoWindowContent = `<div id='content' style="color:black">
                                <h2 id="firstHeading" class="firstHeading">${mapMarker.title}</h2>
                                <p>Latitud:${mapMarker.latitude}</p>
                                <p>Longitud:${mapMarker.longitude}</p>
                              </div>`;
    let infoWindow = new google.maps.InfoWindow({
      content:infoWindowContent
    });

    mapMarker.addListener("click",()=>{
      this.closeAllInfoWindows();
      infoWindow.open(this.map,mapMarker);
    })
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows(){
    for(let infoWindow of this.infoWindows){
      infoWindow.close();
    }
  }

  ionViewDidEnter() {
    this.showMap();
  }

  showMap(){
    const location = new google.maps.LatLng(this.markers[0].latitude, this.markers[0].longitude);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToApp(this.markers);
  }

}
