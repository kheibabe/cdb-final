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

    constructor()
    {
        this.authenticated = this.getItem("authenticated");
        if (this.getItem("realm"))
        {
            this.realm = this.getItem("realm");
        }
        if (this.getItem("nonce"))
        {
            this.nonce = this.getItem("nonce");
        }
        if (this.getItem("qop"))
        {
            this.qop = this.getItem("qop");
        }
        this.uri = this.getItem("uri");
        if (this.getItem("cnonce"))
        {
            this.cnonce = this.getItem("cnonce");
        }
        if (this.getItem("useCount"))
        {
            this.useCount = this.getItem("useCount");
        }
        if (this.getItem("algorithm"))
        {
            this.algorithm = this.getItem("algorithm");
        }
        if (this.getItem("user"))
        {
            this.user = this.getItem("user");
        }
    }

    updateStorage()
    {
        this.saveItem("authenticated",this.authenticated);
        this.saveItem("realm",this.realm);
        this.saveItem("nonce",this.nonce);
        this.saveItem("qop",this.qop );
        this.saveItem("uri",this.uri );
        this.saveItem("cnonce",this.cnonce);
        this.saveItem("useCount",this.useCount);
        this.saveItem("algorithm",this.algorithm );
        this.saveItem("user",this.user);
    }

    updateAuthenticate()
    {
        this.saveItem("authenticated",this.authenticated);
    }

    private getItem = (itemName: any) => {
        try{
            const serializedState = localStorage.getItem(itemName);
            if(serializedState === null){ return undefined }
            return JSON.parse(serializedState);
        }catch(err){
            return undefined
        }
    }

    private saveItem = (key: string,data: any) => {
        const serializedState = JSON.stringify(data);
        localStorage.setItem(key,serializedState);
    }
}
