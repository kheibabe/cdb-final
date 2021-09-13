import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthInfos} from './auth-infos.model';

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {

    constructor (private authInfos : AuthInfos, private translate : TranslateService, private snackBar : MatSnackBar){}
    canActivate() {
        if (this.authInfos.authenticated)
        {
            return true;
        }
        this.translate.get('errorAuthorization').subscribe((res: string) => {
            this.snackBar.open(res, "Ok");
        });
        return false;
    }
}