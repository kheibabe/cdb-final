import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthInfos } from '../shared/auth-infos.model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authInfos : AuthInfos, private router : Router,private translate : TranslateService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authInfos.authenticated = false;
    this.authInfos.user = undefined;
    this.router.navigateByUrl('/');

    this.translate.get('successLogout').subscribe((res: string) => {
      this.snackBar.open(res, "Ok");
    });
  }

}
