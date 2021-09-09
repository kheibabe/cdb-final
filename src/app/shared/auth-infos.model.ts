import { Injectable } from "@angular/core";
import { User } from "../model/user.model";

@Injectable(
    {
        providedIn :'root'
    }
)
export class AuthInfos
{
    authenticated: boolean = false;
    realm!: string | null;
    nonce!:string | null;
    qop! : string | null;
    uri!: string | null;
    cnonce:string = "0a4f113b";
    useCount:number = 0;
    algorithm:string = "MD5";
    user ?: User;
}
