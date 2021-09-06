import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../company/company.model';



@Injectable({
  providedIn: 'root'
})


export class CompanyService {

baseUrl = 'http://10.0.1.217:8080';

constructor(private readonly http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}`)
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/${id}`);
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}`, company)
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
