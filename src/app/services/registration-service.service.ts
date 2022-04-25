import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registrationModel } from './interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  private viewData = new Subject<any>();
  public view = this.viewData.asObservable();
  
  API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  registration(data: registrationModel): Observable<any> {

    return this.http.post(`${this.API_URL}/auth/signup`, data)

  }
  
}
