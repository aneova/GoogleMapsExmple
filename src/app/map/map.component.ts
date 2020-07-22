import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ChartComponent} from '../chart/chart.component';

class Item {
  public  header;
  public  content;
  public deep;
  public backgr;
  public selected;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public mode: FormControl;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private bottomSheet: MatBottomSheet) { }

  map: google.maps.Map;

  flightPlanCoordinates = [
    {lat: 56.73576677, lng: 37.16203272},
    {lat: 56.735602, lng: 37.16139168}
  ];

  tubes = [
    [{lat: 56.735758, lng: 37.162},
     {lat: 56.735733, lng: 37.1619}],
    [{lat: 56.735645, lng: 37.16155797},
    {lat: 56.7356787, lng: 37.16169}]];

  public itemList: Item[] = [
    {
      header: 'item1',
      content: 'Трещина CL продольные',
      deep: '3м',
      backgr: '#0cc6b7',
      selected: false,
    },
    {
      header: 'item2',
      deep: '8м',
      content: 'F разлом',
      backgr: '#f654d0',
      selected: false,
    },
    {
      header: 'item3',
      deep: '13м',
      content: 'Трещина CL продольные',
      backgr: '#0cc6b7',
      selected: false,
    },
    {
      header: 'item4',
      deep: '22м',
      content: 'F разлом',
      backgr: '#f654d0',
      selected: false,
    }
  ];

  ngOnInit(): void {

    this.mode = new FormControl('side');
    this.latitude = 56.73576677;
    this.longitude = 37.16203272;
    this.setCurrentPosition();
    const flightPath = new google.maps.Polyline({
      path: this.flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(this.map);
  }

  private setCurrentPosition(): any {
    if ('geolocation' in navigator) {
      this.zoom = 20;
    }
  }

  openMenu(itemNumber: number): void {
   this.sidenav.toggle();
   this.itemList.forEach(i => {
      i.selected = false;
    });
   this.itemList[itemNumber - 1].selected = true;
  }

  openBottomSheet(): void {
    this.bottomSheet.open(ChartComponent);
  }

}
