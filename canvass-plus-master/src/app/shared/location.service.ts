import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) { }

    gm_api_key: string = 'AIzaSyCOkGAVoep0wm978xtPRAh54Mta5qSugwE';

    reverseGeocode(latitude: number, longitude: number) {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + this.gm_api_key);
    }
}
