import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { OrderServiceService } from 'src/app/services/order-service.service';

export interface Colors {
  [index: number]: string;
}

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.scss']
})
export class OrderformComponent implements OnInit {

  formDetail: FormGroup;
  checkValue: String = "";
  rateAmount: number = 0;
  quantityAmount: number = 0;
  discountAmount: number = 0;
  amountDetail: number = 0;
  partySKU: any;
  productSKU: any;

  @Input() dataType = "";



  constructor(private fb: FormBuilder, private router: Router, private http: HttpServiceService, private orderService: OrderServiceService) {

    this.formDetail = this.fb.group(
      {

        name: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        discount: [''],
        colors: ['', [Validators.required]],
        date: ['', [Validators.required]],
        partySku: ['', [Validators.required]],
        paymentMode: ['', [Validators.required]],
        productSku: ['', [Validators.required]],
        quantity: ['', Validators.required],
        rate: ['', [Validators.required]],
        buyerPartySku: ['', [Validators.required]],
        shippingMode: ['', [Validators.required]],
        sizes: ['', [Validators.required]],
        total: ['', [Validators.required]],
        type: ['', [Validators.required]],
      },
    )

  }
  ngOnInit(): void {
    let date = new Date()
    console.log(date.getDate());

    this.orderService.orderDetail().subscribe(res => {
      console.log(res);
      
      console.log(res.data.buyerSKU);
      this.productSKU = res.data.productSKU;

      if (this.dataType === 'buyer')
        this.partySKU = res.data.buyerPartySKU;
      if (this.dataType === 'seller')
        this.partySKU = res.data.sellerPartySKU;
    })
  }

  formclick() {
    this.formDetail.patchValue({ amount: this.rateAmount * this.quantityAmount });
    let amount: number = this.rateAmount * this.quantityAmount;
    let discount: number = amount * this.discountAmount / 100;
    this.formDetail.patchValue({ total: amount - discount });
  }

  rateData(data: string) {
    this.rateAmount = Number(data);
  }

  quantityData(data: string) {
    this.quantityAmount = Number(data);
  }

  discountData(data: string) {
    this.discountAmount = Number(data);
  }

  size(data: string) {
    this.checkValue = data;
    console.log(data);
  }
  color(data: string) {
    this.checkValue = data;
    console.log(data);
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  colorsData: Colors[] = [];
  sizesData: Colors[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our colors
    if (value) {
      if (this.checkValue === 'color') {
        this.colorsData.push(value);
      }
      if (this.checkValue === 'size') {
        this.sizesData.push(value);
      }
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(color: Colors): void {

    if (this.checkValue === 'color') {
      const index = this.colorsData.indexOf(color);
      if (index >= 0) {
        this.colorsData.splice(index, 1);
      }
    }
    if (this.checkValue === 'size') {
      const index = this.sizesData.indexOf(color);
      if (index >= 0) {
        this.sizesData.splice(index, 1);
      }
    }

  }

  formValidation(data: string) {
    return this.formDetail.get(data)

  }


  submitOrderData() {

    this.formDetail.patchValue({ type: this.dataType })
    this.formDetail.patchValue({ colors: this.colorsData })
    this.formDetail.patchValue({ sizes: this.sizesData })
    console.log(this.formDetail.value);

    this.orderService.order(this.formDetail.value).subscribe(res => {
      console.log(res);
    })

  }



}
