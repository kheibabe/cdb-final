import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpProgressEvent
} from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { Store } from '@ngrx/store';
import { Md5 } from 'ts-md5/dist/md5';
import {Observable} from 'rxjs';
import { tap, map, catchError, elementAt } from 'rxjs/operators';
import { User } from "../model/user.model";
import { AuthInfos } from '../shared/auth-infos.model';
import { updateData } from '../state/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authInfos : AuthInfos, private store: Store<{ authStored: AuthInfos }>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request.clone();

    if(this.authInfos.authenticated)
    {
      authReq = request.clone({
        headers: this.getHeader()
      });
    }

    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const header : string[] | undefined = event.headers.get("WWW-Authenticate")?.split(",");
            this.updateCredentials(header,request.urlWithParams);
          }
          if (event instanceof HttpErrorResponse) {
            const header : string[] | undefined = event.headers.get("WWW-Authenticate")?.split(",");
            this.updateCredentials(header,request.urlWithParams);
          }
          if (event instanceof HttpHeaderResponse) {
            const header : string[] | undefined = event.headers.get("WWW-Authenticate")?.split(",");
            this.updateCredentials(header,request.urlWithParams);
          }
          this.authInfos.useCount++;
          return event;
        },
        (error:HttpErrorResponse ) => {

          const header : string[] | undefined = error.headers.get("WWW-Authenticate")?.split(",");
          this.updateCredentials(header,request.urlWithParams);
          return error;
          
        }
      )
    );
  }


  getHeader() :HttpHeaders
  {
      this.authInfos.useCount++;
      let nc = "";
      for (let i = this.authInfos.useCount.toString().length; i < 8; i++)
      {
          nc += "0";
      }
      nc += this.authInfos.useCount;

      let headers = new HttpHeaders(this.authInfos.user ? {
          Authorization : 'Digest realm="' + this.authInfos.realm + '", qop=' + this.authInfos.qop + ', cnonce="' + this.authInfos.cnonce + '", nonce="' + this.authInfos.nonce + 
          '", nc=' + nc + ', uri="' + this.authInfos.uri
          + '", algorithm="' + this.authInfos.algorithm + '", username="' + this.authInfos.user.username + '", response=' + this.encodeResponse(this.authInfos.user)
      } : {});
      return headers;
  }

  encodeResponse(user : User) : string
  {
      const password = Md5.hashStr( user.username+":" +this.authInfos.realm + ":"+user.password);
      const cryptedUri = Md5.hashStr("GET:"+this.authInfos.uri);
      let nc = "";
      for (let i = this.authInfos.useCount.toString().length; i < 8; i++)
      {
          nc += "0";
      }
      nc += this.authInfos.useCount;
      const response = password + ":" + this.authInfos.nonce + ":" + nc + ":" + this.authInfos.cnonce + ":" + this.authInfos.qop + ":"+ cryptedUri;
      return Md5.hashStr(response);
  }

  updateCredentials(header : string[] | undefined, newUrl : string)
  {
    header?.map( (elem : string) =>
    {
      elem = elem.trim();
      const pos = elem.search('=');
      let tuple : string[] = [ elem.substr(0,pos),elem.substr(pos+1)];
      if (tuple[1].startsWith('"') && tuple[1].endsWith('"'))
      {
        tuple[1] = tuple[1].substr(1,tuple[1].length-2);
       
      }
      this.updateAttributs(tuple[0],tuple[1]);     
    });
    this.authInfos.uri = newUrl;
    this.store.dispatch(updateData({authInfos : this.authInfos}));
  }

  updateAttributs(key : string, value : string)
  {
    switch (key) {
      case "nextnonce":
        if (value !== this.authInfos.nonce)
        {
          this.authInfos.useCount = 0;
        }
        this.authInfos.nonce = value;
        break;
      case "nonce":
        if (value !== this.authInfos.nonce)
        {
          this.authInfos.useCount = 0;
        }
        this.authInfos.nonce = value;
        break;
      case "Digest realm":
        this.authInfos.realm = value;
        break;
      case "qop":
        this.authInfos.qop = value;
        break;
      default:
        break;
    }
    
  }
}
