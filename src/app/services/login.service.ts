import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user.model";
import { Md5 } from 'ts-md5/dist/md5';
import { AuthenticationInterceptor } from "./authentication.interceptor";
import { AuthInfos } from "../shared/auth-infos.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    baseUrl = 'http://localhost:8080';
    apiUrl = '/training-java-webapp/';

    constructor(private readonly http: HttpClient, private authInfos : AuthInfos) {}


    login(user : User, callbackSuccess : any, callbackFailure : any)
    {
        
        this.authInfos.authenticated = true;
        this.authInfos.user = user;

        this.http.get<any>(this.baseUrl + this.apiUrl,{observe : "response"}).subscribe(response => {    
            return callbackSuccess && callbackSuccess();
        },
        (error: HttpErrorResponse) => {
            if (error.status == 401)
            {
                this.http.get<any>(this.baseUrl + this.apiUrl,{observe : "response"}).subscribe(response => {    
                    return callbackSuccess && callbackSuccess();
                },
                (error: HttpErrorResponse) => {
                    if (error.status == 401)
                    {
                       this.authInfos.authenticated = false; 
                       return callbackFailure && callbackFailure();
                    }
                    return callbackSuccess && callbackSuccess();
                }
                )

            } 
            return callbackSuccess && callbackSuccess();
        }
            
        );

    }
}
