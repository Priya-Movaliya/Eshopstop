import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { PartyServiceService } from 'src/app/services/party-service.service';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-formdilog',
  templateUrl: './formdilog.component.html',
  styleUrls: ['./formdilog.component.scss']
})
export class FormdilogComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  action: string = 'X';
  formDetail: FormGroup;
  stateData: any;
  stateId: string = "";
  cityData: any;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private router: Router, private http: HttpServiceService, private partyService: PartyServiceService) {

    this.formDetail = this.fb.group(
      {
        name: ['', [Validators.required]],
        alias: [''],
        sku: ['', [Validators.required]],
        groupName: [''],
        type: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        pancardNo: ['', [Validators.pattern('^[A-Z0-9]{10}$')]],
        adharcardNo: ['', Validators.pattern('^[0-9]{12}$')],
        gstNo: ['', [Validators.maxLength(24), Validators.minLength(24)]],
        address: ['', [Validators.required]],
        area: [''],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        pincode: [''],
      },
    )
  }

  formValidation(data: string) {
    return this.formDetail.get(data);
  }

  submitPartyDetails() {

    this.partyService.party(this.formDetail.value).subscribe(res => {
      console.log(res);
      setTimeout(() => {
        window.location.reload();        
      }, 1500);

    })

  }

  /**
   * 
   * @param data this is the stateId
   */

  submit(data: string) {
    this.stateId = data

    this.http.getCity(this.stateId).subscribe(res => {
      this.cityData = res.data

    })
  }
  ngOnInit(): void {
    this.http.getState().subscribe(res => {
      console.log("hello");

      console.log(res);

      this.stateData = res.data;
    }, (error: any) => {
      console.log(error);
    })

  }

}
