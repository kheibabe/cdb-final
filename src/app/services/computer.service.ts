import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Computer } from '../computer/model/computer.model';


@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  getdata(event: import("@angular/material/paginator").PageEvent | undefined) {
    throw new Error('Method not implemented.');
  }

 // baseUrl = 'http://10.0.1.217:8080'; //localhost de Lisa
  baseUrl ='http://localhost:8080';
  apiUrl = 'training-java-webapp/service';
  getComputersEndpoint = 'computers?';
  getIdEndpoint = 'computers?id=';
  getPage = 'page=';
  getSize ='&size=';
  numPage = 1;
  pageSize = 100;
  getDirection = '&direction=';
  getOrder = '&order=';
  order = 'cp.name';
  direction = 'ASC';
  nbElementDB = 0;

  getSearch = '&search='
  research = '';

  getComputersOrdered(direction: String, order: String): Observable<Computer[]> {
    console.log(`${this.baseUrl}/${this.apiUrl}/${this.getComputersEndpoint}${this.getPage}${1}${this.getSize}${10}${this.getDirection}${direction}${this.getOrder}${order}`);
    return this.http.get<Computer[]>(`${this.baseUrl}/${this.apiUrl}/${this.getComputersEndpoint}${this.getPage}${1}${this.getSize}${10}${this.getDirection}${direction}${this.getOrder}${order}`);
}
  setNumPage(num: number) : void {
    this.numPage =  num;
  }

  setPageSize(size: number) : void {
    this.pageSize =  size;
  }

  countComputers(): Observable<Number> {
    return this.http.get<Number>(`${this.baseUrl}/${this.apiUrl}/computers/nb`);
}

  getComputers(pageSize: number, pageIndex: number, direction: String, order: String): Observable<Computer[]> {
    return this.http.get<Computer[]>(`${this.baseUrl}/${this.apiUrl}/${this.getComputersEndpoint}${this.getPage}${pageIndex }${this.getSize}${ pageSize}${this.getDirection}${direction}${this.getOrder}${order}`);
}

  getComputerById(id: number): Observable<Computer> {
    return this.http.get<Computer>(`${this.baseUrl}/${this.apiUrl}/${this.getIdEndpoint}${ id }`);
}

  addComputer(computer: Computer): Observable<Computer> {
  return this.http.post<Computer>(`${this.baseUrl}`, computer)
}

  deleteComputer(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${this.apiUrl}/${id}`);
}


  constructor(private readonly http: HttpClient) { }
}
