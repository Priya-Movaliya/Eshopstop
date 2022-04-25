import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registrationModel, loginModel } from './interface';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {


  API_URL: string = environment.API_URL;

  private viewData = new Subject<any>();
  public view = this.viewData.asObservable();

  constructor(private http: HttpClient) { }

 
  getState(): Observable<any> {

    return this.http.get(`${this.API_URL}/location/getState`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

  getCity(stateId: string): Observable<any> {

    return this.http.get(`${this.API_URL}/location/getStateCities/${stateId}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

 

  category(): Observable<any> {

    return this.http.get(`${this.API_URL}/category`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }
 

 
}







