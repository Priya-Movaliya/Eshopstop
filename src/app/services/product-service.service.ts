import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { productModel, responseProductModel } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private viewData = new Subject<any>();
  public view = this.viewData.asObservable();

  API_URL: string = `${environment.API_URL}/product`;

  constructor(private http: HttpClient) { }

  product(data: productModel) {

    return this.http.post(`${this.API_URL}`, data, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }
  productDetail() {

    return this.http.get(`${this.API_URL}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }


  productTable(pageSize: number | undefined, pageIndex: any, search: string): Observable<any> {

    return this.http.get(`${this.API_URL}?pageNo=${pageIndex}&size=${pageSize}&search=${search}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }



  updateProduct(id: string, data: any) {


    return this.http.put(`${this.API_URL}/${id}`, data, {

      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }

  viewProduct(id: string): Observable<any> {
    console.log("hello");

    return this.http.get(`${this.API_URL}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }
  passProductData(data: any) {
    this.viewData.next(data);
    console.log(data._id);

  }

}
