import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../company/company.model';



@Injectable({
  providedIn: 'root'
})


export class CompanyService {

// baseUrl = 'http://10.0.1.217:8080'; //localhost de Lisa
baseUrl ='http://localhost:8080';
apiUrl = 'training-java-webapp/service';
getAllEndpoint = 'companies';
getIdEndpoint = 'companies?id=';

constructor(private readonly http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/${this.apiUrl}/${this.getAllEndpoint}?page=1&size=100`)
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/${this.apiUrl}/${this.getIdEndpoint}${id}`);
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}`, company)
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.apiUrl}/${id}`);
  }

}
