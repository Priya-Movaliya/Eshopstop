import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private viewData = new Subject<any>();
  public view = this.viewData.asObservable();

  API_URL: string = `${environment.API_URL}/order`;

  constructor(private http: HttpClient) { }

  order(data: object): Observable<any> {

    return this.http.post(`${this.API_URL}`, data, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

  orderDetail(): Observable<any> {

    return this.http.get(`${this.API_URL}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

  orderTable(pageSize: number | undefined, pageIndex: any, search: string): Observable<any> {

    return this.http.get(`${this.API_URL}?pageNo=${pageIndex}&size=${pageSize}&search=${search}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }

  updateOrder(id: string, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }
  viewOrder(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }
  passOrderData(data: any) {
    this.viewData.next(data);
    console.log(data._id);

  }

}
