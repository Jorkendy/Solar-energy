import {Injectable} from "@angular/core";
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class MapGpsService {
    get() {
        return of([
            {
                uuid: '9e4052c9-cdd1-45af-9174-96dbaa1fd40e',
                name: 'Station 1',
                lat: '10.780811',
                long: '106.649390',
            },
            {
                uuid: 'e95d468b-8973-47a6-8700-4b2c538f38d5',
                name: 'BK.HCM',
                lat: '10.773466',
                long: '106.659426',
            }
        ])
    }
}
