import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { orderModel, responseOrderModel, ViewModel } from './interface';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private viewData = new Subject<any>();
  public view = this.viewData.asObservable();

  API_URL: string = `${environment.API_URL}/order`;

  constructor(private http: HttpClient) { }

  order(data: orderModel) {

    return this.http.post(`${this.API_URL}`, data, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

  orderDetail(): Observable<responseOrderModel> {

    return this.http.get<responseOrderModel>(`${this.API_URL}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

  orderTable(pageSize: number | undefined, pageIndex: any, search: string): Observable<responseOrderModel> {

    return this.http.get<responseOrderModel>(`${this.API_URL}?pageNo=${pageIndex}&size=${pageSize}&search=${search}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

  deleteOrder(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }

  updateOrder(id: string, data: any) {
    return this.http.put(`${this.API_URL}/${id}`, data, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }

  viewOrder(id: string): Observable<ViewModel> {
    return this.http.get<ViewModel>(`${this.API_URL}/${id}`, {
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
