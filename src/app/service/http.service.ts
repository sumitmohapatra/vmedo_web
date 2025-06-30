import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class HttpService {
    /**
     * CONSTRUCTOR
     * @param httpClient 
     */
    constructor(private httpClient : HttpClient) {}

    /**
     * SENDS HTTP REQUEST
     * @param url 
     * @param method 
     * @param headers 
     * @param body 
     * @returns Asynchronous Response | Error
     */
    SendRequest(url : string, method : HttpMethod, headers : HttpHeaders, body : any) {
        return new Promise((resolve: any, reject: any) => {         

            let options = {
                headers: headers
            };
    
            switch(method){
                case HttpMethod.GET:{
                    return this.httpClient.get(url, options).toPromise().then((res: any) => resolve(res)).catch((rej: any) => reject(rej));
                }
                case HttpMethod.POST:{
                    return this.httpClient.post(url, body, options).toPromise().then((res: any) => resolve(res)).catch((rej: any) => reject(rej));
                }
                case HttpMethod.DELETE:{
                    return this.httpClient.delete(url, options).toPromise().then((res: any) => resolve(res)).catch((rej: any) => reject(rej));
                }
                case HttpMethod.PATCH:{
                    return this.httpClient.patch(url, options).toPromise().then((res: any) => resolve(res)).catch((rej: any) => reject(rej));
                }
                case HttpMethod.PUT:{
                    return this.httpClient.put(url, body, options).toPromise().then((res: any) => resolve(res)).catch((rej: any) => reject(rej));
                }
                default:{
                    return this.httpClient.get(url, options).toPromise().then((res: any) => resolve(res)).catch((rej: any) => reject(rej));
                }
            }
        });
    }
}

export class HttpMethod {
    static GET : any = 'GET';
    static POST : any = 'POST';
    static PUT : any = 'PUT';
    static PATCH : any = 'PATCH';
    static DELETE : any = 'DELETE';
}

