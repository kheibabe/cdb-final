import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthInfos } from '../shared/auth-infos.model';
import { AuthenticationInterceptor } from '../services/authentication.interceptor';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Demo';
  greeting = {};

  constructor(private loginService: LoginService, private readonly authInfos : AuthInfos) { }

  authenticated() { return this.authInfos.authenticated; }

  ngOnInit(): void {
  }

}



