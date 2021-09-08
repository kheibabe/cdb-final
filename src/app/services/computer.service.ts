import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Computer } from '../computer/model/computer.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  baseurl = 'http://10.0.1.217:8080';
  apiUrl = 'training-java-webapp/service';
  computersEndpoint = 'computers?page=1&size=10';
  

  getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>(`${this.baseurl}/${this.apiUrl}/${this.computersEndpoint}`);
}

  getComputerById(id: number): Observable<Computer> {
    return this.http.get<Computer>(`${this.baseurl}/${this.apiUrl}/${this.computersEndpoint}/${ id }`);
}

  constructor(private readonly http: HttpClient,loginService : LoginService) { }
}
