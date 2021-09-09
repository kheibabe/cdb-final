import { Component, OnInit } from '@angular/core';
import { AuthInfos } from '../shared/auth-infos.model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authInfos : AuthInfos) { }

  ngOnInit(): void {
    this.authInfos.authenticated = false;
    this.authInfos.user = undefined;
  }

}
