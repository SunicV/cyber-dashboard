import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MapService {
    private culturalUrl = 'assets/mockdata/cultural.json';  // URL to web api
    private cultural: any[];
    private worldUrl='assets/mockdata/110m.json';
    private world: any[];
    private countryUrl='assets/mockdata/countriestopo.json';
    private country: any[];
    private countryMapUrl='assets/mockdata/country_map.json';
    private countryMap: any[];
    constructor(private http: Http) { }

    dataArray:any=[
        {"s":"2","la":"41.7752","lo":"2.5116","c":"ES","b":"nivdort","co":"#aa9339"},
        {"s":"2","la":"39.4667","lo":"-0.3667","c":"ES","b":"mirai","co":"#d8ebff"},
        {"s":"2","la":"38.7878","lo":"0.1619","c":"ES","b":"nivdort","co":"#aa9339"},
        {"s":"2","la":"16.2464","lo":"-92.1488","c":"MX","b":"nivdort","co":"#aa9339"},
        {"s":"2","la":"44.1833","lo":"28.65","c":"RO","b":"nivdort","co":"#aa939"},
        {"s":"2","la":"33.9562","lo":"-83.988","c":"US","b":"nivdort","co":"#aa9339"}
    ];

    getData(): any {
        let current = Math.floor(Math.random() * this.dataArray.length);
        return this.dataArray[current];
      }


    getCountry(): Promise<any[]> {
      return this.http.get(this.countryUrl)
          .toPromise()
          .then(response => {
              console.log('response');
              console.log(response);
              return response.json();
          })
          .catch(this.handleError);
  }

  getCountryMap(): Promise<any[]> {
    return this.http.get(this.countryMapUrl)
        .toPromise()
        .then(response => {
            console.log('response');
            console.log(response);
            return response.json();
        })
        .catch(this.handleError);
}


    getCultural(): Promise<any[]> {
        return this.http.get(this.culturalUrl)
            .toPromise()
            .then(response => {
                console.log('response');
                console.log(response);
                return response.json();
            })
            .catch(this.handleError);
    }

    getWorld(): Promise<any[]> {
        return this.http.get(this.worldUrl)
            .toPromise()
            .then(response => {
                console.log('response');
                console.log(response);
                return response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}

