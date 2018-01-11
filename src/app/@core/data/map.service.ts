import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MapService {
    private culturalUrl = 'assets/mockdata/cultural.json';  // URL to web api
    private cultural: any[];
    constructor(private http: Http) { }

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

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}

