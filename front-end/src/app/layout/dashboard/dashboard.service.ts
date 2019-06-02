import {Injectable} from "@angular/core";
import {of} from "rxjs";
import data from '../../mock-data/mock-data';

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    constructor() {
    }

    get(uuid: string) {
        return of(data.find(station => station.uuid === uuid));
    }
}
