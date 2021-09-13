import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  credentials: User = {username: '', password: '', authority:"USER"};

  constructor(private loginService: LoginService, private router: Router,private translate : TranslateService, private snackBar: MatSnackBar) {
  }

  login() {
    this.loginService.login(this.credentials, () => {
        this.router.navigateByUrl('/');
    }, () =>
    {
      this.translate.get('errorLogin').subscribe((res: string) => {
        this.snackBar.open(res, "Ok");
      })
    });
    
  }

  ngOnInit(): void {
  }

}
