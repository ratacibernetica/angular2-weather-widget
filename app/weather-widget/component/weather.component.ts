import { Component, OnInit } from "@angular/core";
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = 'kph';
    currentTempUnit = 'celsius';
    currentLocation = "";

    constructor(private service: WeatherService) {}

    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
                this.getLocationName();
            },
            err =>
                console.error(err) 
            );
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.temp = weather["currently"]["temperature"];
                this.weatherData.humidity = weather["currently"]["humidity"];
                this.weatherData.summary = weather["currently"]["summary"];
                this.weatherData.icon = weather["currently"]["icon"];
                this.weatherData.wind = weather["currently"]["windSpeed"];
                console.log("Weather: ", this.weatherData); //TODO Remove
            }
            , err => console.error(err));
    }

    getLocationName(){
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
        .subscribe( location => {
            console.log(location); //TODO REMOVE
            this.currentLocation = location["results"][0]["formatted_address"];
            console.log("Name: ", this.currentLocation); //TODO REMOVE
        },
        err => {
            console.error(err);
        } 
        );
    }

    toggleUnits(){
        this.toggleSpeedUnits();
        this.toggleTempUnits();
    }

    toggleSpeedUnits(){
        if( this.currentSpeedUnit == 'kph'){
            this.currentSpeedUnit = 'mph';
        }else{
            this.currentSpeedUnit = 'kph';
        }
    }

    toggleTempUnits(){
        console.log(this.currentTempUnit);
        if( this.currentTempUnit == "fahrenheit"){
            this.currentTempUnit = "celsius";
        } else {
            this.currentTempUnit = "fahrenheit";
        }
    }
}