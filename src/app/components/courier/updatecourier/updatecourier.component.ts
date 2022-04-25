import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourierServiceService } from 'src/app/services/courier-service.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-updatecourier',
  templateUrl: './updatecourier.component.html',
  styleUrls: ['./updatecourier.component.scss']
})
export class UpdatecourierComponent implements OnInit {

  formDetail: FormGroup;
  fromAddress: FormGroup;
  toAddress: FormGroup;
  stateData: any;
  stateId: string = "";
  cityData: any;
  courierData: any;
  orderIdData: any;

  constructor(private fb: FormBuilder, private http: HttpServiceService, private courierService: CourierServiceService) {
    this.formDetail = this.fb.group(
      {

        companyName: ['', [Validators.required]],
        trackingId: ['', [Validators.required]],
        shippingCharge: ['', [Validators.required]],
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
      console.log(res);
      this.orderIdData = res.data.orderId;

    })
    this.http.getState().subscribe(res => {
      this.stateData = res.data;
    })

    this.courierService.view.subscribe(res => {
      this.courierData = res
      console.log(this.courierData);
      console.log(this.courierData.companyName);


      let formDetailObj: object = {
        companyName: this.courierData.companyName,
        trackingId: `${this.courierData.trackingId}`,
        shippingCharge: `${this.courierData.shippingCharge}`,
        orderId: `${this.courierData.orderId}`,
        paymentMode: this.courierData.paymentMode
      }

      let fromAddressObj: object = {
        state: this.courierData.fromAddress.state,
        city: `${this.courierData.fromAddress.city}`,
        street: `${this.courierData.fromAddress.street}`,
        pincode: `${this.courierData.fromAddress.pincode}`,
      }

      let toAddressObj: object = {
        state: this.courierData.toAddress.state,
        city: `${this.courierData.toAddress.city}`,
        street: `${this.courierData.toAddress.street}`,
        pincode: `${this.courierData.toAddress.pincode}`,
      }
      this.fromAddress.patchValue(fromAddressObj)
      this.toAddress.patchValue(toAddressObj)
      this.formDetail.patchValue(formDetailObj)
    })
  }

  submit(data: string) {
    this.stateId = data

    this.http.getCity(this.stateId).subscribe(res => {
      this.cityData = res.data

    })
  }

  onClickSubmit() {
    this.formDetail.patchValue({ fromAddress: this.fromAddress.value })
    this.formDetail.patchValue({ toAddress: this.toAddress.value })
    console.log(this.formDetail.value);
    this.courierService.updateCourier(this.courierData._id, this.formDetail.value).subscribe(res => {
      console.log(res);

    })

  }
}
