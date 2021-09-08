import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./login/user.model";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    baseUrl = 'http://10.0.1.217:8080';
    apiUrl = 'training-java-webapp/service';

  authenticated = false;

  constructor(private readonly http: HttpClient) {
  }


  authenticate(credentials: any, callback: any) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('user', {headers: headers}).subscribe(response => {
        if (response) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return callback && callback();
    });

}

}
