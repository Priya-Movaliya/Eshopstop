import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginModel } from './interface';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  API_URL: string = environment.API_URL;

  private viewData = new Subject<any>();
  public view = this.viewData.asObservable();

  constructor(private http: HttpClient) { }
 
  login(data: loginModel): Observable<any> {

    return this.http.post(`${this.API_URL}/auth/login`, data)

  }

  forgotPassword(data: loginModel): Observable<any> {

    return this.http.post(`${this.API_URL}/auth/forgetPassword`, data)

  }

}
