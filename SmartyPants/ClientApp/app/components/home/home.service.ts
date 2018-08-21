import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Address } from '../../model/address';

@Injectable()
export class HomeService {
    private _http: Http;
    private _baseUrl: string;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this._http = http;
    }

    getAddress(address: Address) {
        //return this._http.get('https://smarty-apim.azure-api.net/street-address?street=180%20W%20Julianna%20Dr&city=Southampton&state=PA&zipcode=');

        return this._http.post('/api/Address/', address);
    }
}