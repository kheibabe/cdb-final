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

  baseUrl = 'http://10.0.1.217:8080';
  apiUrl = 'training-java-webapp/service';
  //getAllEndpoint = 'computers/all';
  getIdEndpoint = 'computers?id=';
  getPage = 'computers?page=';
  getSizeEndpoint ='&size='
  numPage = 1;
  pageSize = 100;

  orderBy = 'cp.name'
  dir = 'ASC';
  nbElementDB = 0;
  research = '';

  getData(){

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

  getComputers(pageSize: number, pageIndex: number): Observable<Computer[]> {
    return this.http.get<Computer[]>(`${this.baseUrl}/${this.apiUrl}/${this.getPage}${pageIndex }${this.getSizeEndpoint}${ pageSize}`);
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
