import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})


export class CompanyService {

  baseUrl = 'http://localhost:8080';
  apiUrl = 'training-java-webapp/service';
  getAllEndpoint = 'companies?page=1&size=10';
  getIdEndpoint = 'companies?id=';

  constructor(private readonly http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/${this.apiUrl}/${this.getAllEndpoint}`);
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

}
