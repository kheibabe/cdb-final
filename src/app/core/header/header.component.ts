import { HttpClient } from '@angular/common/http';
import { Component, Input, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInfos } from 'src/app/shared/auth-infos.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@Injectable()

export class HeaderComponent implements OnInit {


  ngOnInit(): void {
  }

  constructor(private app: LoginService, public readonly authInfos: AuthInfos, private router: Router) {
  }
  /*logout() {
    this.http.post('logout', {}).finally(() => {
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
    }).subscribe();
  }*/

}
