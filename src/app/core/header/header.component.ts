import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private app: LoginService, private http: HttpClient, private router: Router) {
  }
  /*logout() {
    this.http.post('logout', {}).finally(() => {
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
    }).subscribe();
  }*/

}
