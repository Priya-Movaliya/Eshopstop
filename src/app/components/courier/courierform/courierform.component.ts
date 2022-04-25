import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourierServiceService } from 'src/app/services/courier-service.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-courierform',
  templateUrl: './courierform.component.html',
  styleUrls: ['./courierform.component.scss']
})
export class CourierformComponent implements OnInit {
  formDetail: FormGroup;
  fromAddress: FormGroup;
  toAddress: FormGroup;
  stateData: any;
  stateId: string = "";
  cityData: any;
  orderIdData: any;

  constructor(private fb: FormBuilder, private http: HttpServiceService, private courierService: CourierServiceService) {
    this.formDetail = this.fb.group(
      {

        companyName: ['', [Validators.required]],
        trackingId: ['', [Validators.required]],
        shippingCharge: [''],
        paymentMode: ['', [Validators.required]],
        orderId: ['', [Validators.required]],
        fromAddress: ['', [Validators.required]],
        toAddress: ['', [Validators.required]],
      })

    this.fromAddress = this.fb.group({
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      street: ['', [Validators.required]],
    })

    this.toAddress = this.fb.group({
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      street: ['', [Validators.required]],

    })
  }

  ngOnInit(): void {
    this.courierService.courierDetail().subscribe(res => {
      console.log(res.data.orderId);
      this.orderIdData = res.data.orderId;
    })
    this.http.getState().subscribe(res => {
      console.log("hello");

      console.log(res);

      this.stateData = res.data;
    })
  }

  submit(data: string) {
    this.stateId = data

    this.http.getCity(this.stateId).subscribe(res => {
      this.cityData = res.data

    })
  }

  submitCourierData() {
    this.formDetail.patchValue({ fromAddress: this.fromAddress.value })
    this.formDetail.patchValue({ toAddress: this.toAddress.value })
    console.log(this.formDetail.value);
    this.courierService.courier(this.formDetail.value).subscribe(res => {
      console.log(res);

    })

  }

}
