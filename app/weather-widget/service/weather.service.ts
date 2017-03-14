import { Injectable } from '@angular/core';
import { FORECAST_KEY, FORECAST_ROOT } from '../constants/constants';
@Injectable()

export class WeatherService {
    getCurrentLocation(): [number, number] {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( pos => {
                console.log("Position: ", pos.coords.latitude,',', pos.coords.longitude);
                return [pos.coords.latitude, pos.coords.longitude];
            }, err => {
                console.error("unable to get current position -", err);
            })
        }else{
            console.error("geolocation is not available");
            return [0,0]
        }
    }
}