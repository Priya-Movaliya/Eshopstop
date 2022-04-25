import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { partyModel, responsePartyModel, ViewModel } from './interface';

@Injectable({
  providedIn: 'root'
})
export class PartyServiceService {

  private viewData = new Subject<any>();
  public view = this.viewData.asObservable();

  API_URL: string = `${environment.API_URL}/vendor`;

  constructor(private http: HttpClient) { }

  party(data: partyModel) {

    return this.http.post(`${this.API_URL}`, data, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
      .pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err.error);

          //Handle the error here

          return throwError(err);
        })
      )
  }

  partyTable(pageSize: number | undefined, pageIndex: any, search: string): Observable<responsePartyModel> {

    return this.http.get<responsePartyModel>(`${this.API_URL}?pageNo=${pageIndex}&size=${pageSize}&search=${search}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    });
  }

  deleteParty(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }

  updateParty(id: string, data: any) {

    return this.http.put(`${this.API_URL}/${id}`, data, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }
  viewParty(id: string): Observable<ViewModel> {
    return this.http.get<ViewModel>(`${this.API_URL}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('secret_token')}`
      })
    })
  }
  passPartyData(data: any) {
    this.viewData.next(data);
    console.log(data._id);

  }

}
