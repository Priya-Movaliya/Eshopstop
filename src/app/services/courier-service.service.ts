import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { courierModel, responseCourierModel, ViewModel } from './interface';

@Injectable({
  providedIn: 'root'
})
export class CourierServiceService {

  private viewData = new Subject<any>();
  public view = this.viewData.asObservable();

  API_URL: string = `${environment.API_URL}/courier`;

  constructor(private http: HttpClient) { }

  courier(data: object): Observable<courierModel> {

    return this.http.post<courierModel>(`${this.API_URL}`, data, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

  courierDetail(): Observable<responseCourierModel> {

    return this.http.get<responseCourierModel>(`${this.API_URL}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }


  courierTable(pageSize: number | undefined, pageIndex: any, search: string): Observable<responseCourierModel> {

    return this.http.get<responseCourierModel>(`${this.API_URL}?pageNo=${pageIndex}&size=${pageSize}&search=${search}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

  deleteCourier(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }

  updateCourier(id: string, data: any) {
    return this.http.put(`${this.API_URL}/${id}`, data, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }
  viewCourier(id: string): Observable<ViewModel> {
    return this.http.get<ViewModel>(`${this.API_URL}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }
  passCourierData(data: any) {
    this.viewData.next(data);
    console.log(data._id);

  }


}
