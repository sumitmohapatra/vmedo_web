import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpService, HttpMethod} from './http.service';

@Injectable({providedIn: 'root'})
export class PropertyService {

    /**
     * CONSTRUCTOR
     * @param httpService 
     */
    constructor(private httpService : HttpService) {}

    /**
     * GET PROPERTIES
     * @SendRequest :       Reading properties from [assets/property.json] file
     * @returns Asynchronous Response | Error
     */
    GetProperties = () => {
        return new Promise((resolve: any, reject: any) => {
                var url = './assets/props/app.json';
                var method = HttpMethod.GET;
                var headers = new HttpHeaders().set('Content-Type', 'application/json');
                this.httpService.SendRequest(url, method, headers, null).then((res: any) => resolve(res)).catch((rej: any) => reject(rej));
            }
        );
    };
}