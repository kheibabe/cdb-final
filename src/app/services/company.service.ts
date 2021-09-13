import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})


export class CompanyService {
  getdata(event: import("@angular/material/paginator").PageEvent | undefined) {
    throw new Error('Method not implemented.');
  }

  baseUrl = 'http://localhost:8080';
  apiUrl = 'training-java-webapp/service';
  getAllEndpoint = 'companies?';
  getIdEndpoint = 'companies?id=';

  getPage = 'page=';
  getSize ='&size=';
  getDirection = '&direction';
  getOrder = '&order=';

  pageSize = 100;


  constructor(private readonly http: HttpClient) { }

  getCompanies(pageSize: number, pageIndex: number): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/${this.apiUrl}/${this.getAllEndpoint}${this.getPage}${pageIndex }${this.getSize}${pageSize}`);
  }
  
  getCompaniesAll(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/${this.apiUrl}/${this.getAllEndpoint}?page=1&size=100`)
  }


  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/${this.apiUrl}/${this.getIdEndpoint}${id}`);
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}/${this.apiUrl}/companies`, company)
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.apiUrl}/${this.getIdEndpoint}${id}`);
  }

  countCompanies(): Observable<Number> {
    return this.http.get<Number>(`${this.baseUrl}/${this.apiUrl}/companies/nb`);
}

  setPageSize(size: number) : void {
    this.pageSize =  size;
  }

  getCompaniesOrdered(direction: string, order: string, pageSize: number): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/${this.apiUrl}/${this.getAllEndpoint}${this.getPage}${1}${this.getSize}${pageSize}${this.getDirection}${direction}${this.getOrder}${order}`);
}

}
