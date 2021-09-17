import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../model/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  credentials: User = {username: '', password: '', authority:"USER"};

  constructor(private loginService: LoginService, private router: Router, private translate : TranslateService, private snackBar : MatSnackBar) {
  }

  register() {

    if (this.credentials.username.length === 0)
    {
      this.translate.get('errorUsername').subscribe((res: string) => {
        this.snackBar.open(res, "Ok");
      });
      return;
    }
    else if (this.credentials.username.length === 0)
    {
      this.translate.get('errorPassword').subscribe((res: string) => {
        this.snackBar.open(res, "Ok");
      });
      return;
    }

    this.loginService.register(this.credentials, () => {
        this.translate.get('successRegister').subscribe((res: string) => {
        this.snackBar.open(res, "Ok");
      })
      this.router.navigateByUrl('/login');
    }, () =>
      {
        this.translate.get('errorRegister').subscribe((res: string) => {
        this.snackBar.open(res, "Ok");
      });
     
    });
    return false;
  }

  ngOnInit(): void {
  }
}
