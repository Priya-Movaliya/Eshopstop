import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  action: string = 'X';

  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("request")
    console.log(request);
    return next.handle(request).pipe(
      tap(e => {
        console.log("eeeee");

        console.log(e);

        if (request.method == "POST" || request.method == "PUT")
          if (e instanceof HttpResponse && e.status == 200) {
            this.snackBar.open(e.body.message, "", {
              duration: 4000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: 'successSnack'
            });
          }
      }),
      catchError(error => {
        this.snackBar.open(error.error.message, "", {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: 'errorSnack'
        });
        return throwError(error);
      })
    );

  }
} 
