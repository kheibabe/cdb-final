import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthInfos} from './auth-infos.model';

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {

    constructor (private authInfos : AuthInfos){}
    canActivate() {
        if (this.authInfos.authenticated)
        {
            return true;
        }
        return false;
    }
}