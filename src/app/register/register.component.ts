import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  credentials: User = {username: '', password: '', authority:"USER"};

  constructor(private loginService: LoginService, private router: Router) {
  }

  register() {
    this.loginService.register(this.credentials, () => {
        this.router.navigateByUrl('/');
    }, () =>
    {
      
    });
    return false;
  }

  ngOnInit(): void {
  }
}
