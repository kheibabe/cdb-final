import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Demo';
  greeting = {};

  constructor(private app: AppService, private http: HttpClient) {
    http.get('http://localhost:8080/training-java-webapp/').subscribe(data => this.greeting = data);
  }

  

  authenticated() { return this.app.authenticated; }

  ngOnInit(): void {
  }

}



