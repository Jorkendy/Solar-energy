import {Component, OnInit} from '@angular/core';
import {MapGpsService} from "./map-gps.service";

@Component({
    selector: 'app-map-gps',
    templateUrl: './map-gps.component.html',
    styleUrls: ['./map-gps.component.scss']
})
export class MapGpsComponent implements OnInit {
    listOfStation: any;
    mapType = 'roadmap';

    constructor(
        private service: MapGpsService
    ) {
    }

    ngOnInit() {
        this.getListOfStation();
    }

    getListOfStation() {
        this.service.get().subscribe(data => {
           this.listOfStation = data;
        });
    }
}
