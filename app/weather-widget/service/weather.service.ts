import { Injectable } from '@angular/core';
import {Jsonp} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FORECAST_KEY, FORECAST_ROOT } from '../constants/constants';

@Injectable()

export class WeatherService {
    
    constructor(private jsonp: Jsonp) {}

    getCurrentLocation(): Observable<any> {
        if(navigator.geolocation){
            return Observable.create( observer => {
                navigator.geolocation.getCurrentPosition(
                    pos => {
                        observer.next(pos);
                    },
                    err => {
                        observer.error(err);
                    });
            });
        }else{
            return Observable.throw("geolocation is not available");
        }
    }

    getCurrentWeather(lat: number, long: number): Observable<any> {
        const url = FORECAST_ROOT + FORECAST_KEY + lat + "," + long;
        const queryParams = '?callback=JSONP_CALLBACK';

        return this.jsonp.get( url + queryParams )
            .map( data => data.json())
            .catch( err => {
                console.error("unable to get weather data - ", err); 
                return Observable.throw(err.json());
            });
    }
}