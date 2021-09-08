import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../login/user.model";
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  authenticated = false;
  realm!: string | null;
  nonce!:string | null;
  qop! : string | null;
  uri!: string | null;
  cnonce = "0a4f113b";
  useCount = 0;
  algorithm = "MD5";
  user ?: User;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.updateCredentials(event,request.urlWithParams);
      }
      this.useCount++;
      return event;
  }));
  }


  getHeader() :HttpHeaders
  {
      this.useCount++;
      let nc = "";
      for (let i = this.useCount.toString().length; i < 8; i++)
      {
          nc += "0";
      }
      nc += this.useCount;

      let headers = new HttpHeaders(this.user ? {
          authorization : 'Digest realm=' + this.realm + ", qop=" + this.qop + ", cnonce" + this.cnonce + ", nonce" + this.nonce + ", nc=" + nc
          + ", algorithm" + this.algorithm + ", user=" + this.user.username + ", response=" + this.encodeResponse(this.user)
      } : {});
      return headers;
  }

  encodeResponse(user : User) : string
  {
      const password = Md5.hashStr( user.username+":"+user.password);
      const rebelote = Md5.hashStr("GET:"+this.uri);
      let nc = "";
      for (let i = this.useCount.toString().length; i < 8; i++)
      {
          nc += "0";
      }
      const response = password + ":" + this.nonce + ":" + nc + ":" + this.cnonce + ":" + this.qop + ":"+ rebelote;
      return response;
  }

  updateCredentials(response : HttpResponse<Object>, newUri :string)
  {
    if (response.headers.get("nonce"))
    {
      if (response.headers.get("nonce") !== this.nonce)
      {
        this.useCount = 0;
      }
        this.nonce = response.headers.get("nonce");
    }

      if (response.headers.get("realm"))
      {
        this.realm = response.headers.get("realm");
      }

      if (response.headers.get("nextnonce"))
      {
        if (response.headers.get("nextnonce") !== this.nonce)
        {
          this.useCount = 0;
        }
        this.nonce = response.headers.get("nextnonce");

      }
      if (response.headers.get("qop"))
      {
        this.qop = response.headers.get("qop");
      }
      this.uri = newUri;
    }
}
