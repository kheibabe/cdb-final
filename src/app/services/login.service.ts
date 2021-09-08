import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../login/user.model";
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    baseUrl = 'http://10.0.1.217:8080';
    apiUrl = 'training-java-webapp/service';

    constructor(private readonly http: HttpClient) {}


    login(user : User, callback : any)
    {
       this.http.get('user', { observe: 'response'}).subscribe(response => {
            if (response) {
                //this.authenticated = true;
            } else {
                //this.authenticated = false;
            }
            return callback && callback();
        });

    }
}
