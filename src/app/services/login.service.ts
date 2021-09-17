import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user.model";
import { Md5 } from 'ts-md5/dist/md5';
import { AuthenticationInterceptor } from "./authentication.interceptor";
import { AuthInfos } from "../shared/auth-infos.model";
import { Authority } from "../model/authority.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    baseUrl = 'http://localhost:8080';
    apiUrl = '/training-java-webapp/service/';
    urlLogin = 'login?username=';
    urlRegister = 'register'

    constructor(private readonly http: HttpClient, private authInfos : AuthInfos) {}


    login(user : User, callbackSuccess : any, callbackFailure : any)
    {
        
        this.authInfos.authenticated = false;
        this.authInfos.user = user;

        this.http.get<Authority>(this.baseUrl + this.apiUrl +this.urlLogin + user.username,).subscribe(response => {    
            if (this.authInfos.user) this.authInfos.user.authority =response.authority;
            this.authInfos.updateStorage();
            return callbackSuccess && callbackSuccess();
        },
        (error: HttpErrorResponse) => {
            if (error.status == 401)
            {
                this.authInfos.authenticated = true;
                this.http.get<Authority>(this.baseUrl + this.apiUrl + this.urlLogin + user.username).subscribe(nextResponse => { 
                    if (this.authInfos.user) this.authInfos.user.authority =nextResponse.authority;
                    this.authInfos.updateStorage();
                    return callbackSuccess && callbackSuccess();
                    
                },
                (nextError: HttpErrorResponse) => {
                    if (nextError.status == 401)
                    {
                       this.authInfos.authenticated = false; 
                       this.authInfos.updateStorage();
                       return callbackFailure && callbackFailure();
                    }
                    this.authInfos.updateStorage();
                    return callbackSuccess && callbackSuccess();
                }
                )

            }
            this.authInfos.updateStorage();
            return callbackSuccess && callbackSuccess();
        }
            
        );

    }

    register(user : User, callbackSuccess : any, callbackFailure : any)
    {
        
        this.http.get<Authority>(this.baseUrl + this.apiUrl +this.urlLogin + user.username,).subscribe(response => {    
            return callbackFailure && callbackFailure();
        },
        (error: HttpErrorResponse) => {
            user.password = Md5.hashStr( user.username+":" +this.authInfos.realm + ":"+user.password);
            this.http.post<User>(this.baseUrl + this.apiUrl + this.urlRegister,user).subscribe(response => {    
                return callbackSuccess && callbackSuccess();
            },
            (error: HttpErrorResponse) => {
                return callbackFailure && callbackFailure();
            })
        })
    }
}
