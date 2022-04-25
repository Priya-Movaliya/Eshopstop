import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { productModel } from 'src/app/services/interface';

export interface Colors {
  [index: number]: string;
}

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.scss']
})
export class ProductformComponent implements OnInit {
  formDetail: FormGroup;
  pdata!: productModel;
  categoryList: any;
  checkValue: String = "";
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  colorsData: Colors[] = [];
  sizesData: Colors[] = [];

  constructor(private fb: FormBuilder, private http: HttpServiceService, private productService: ProductServiceService) {

    this.formDetail = this.fb.group(
      {
        name: ['', [Validators.required]],
        alias: [''],
        sku: ['', [Validators.required]],
        description: ['', [Validators.required]],
        category: ['', [Validators.required]],
        purchaseRate: ['', [Validators.required]],
        sellRate: ['', [Validators.required]],
        colors: ['', [Validators.required]],
        sizes: ['', [Validators.required]],
      },
    )
  }

  formValidation(data: string) {
    return this.formDetail.get(data);
  }

  size(data: string) {
    this.checkValue = data;
    console.log(data);
  }
  color(data: string) {
    this.checkValue = data;
    console.log(data);
  }
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
  submitProductData() {
    this.formDetail.patchValue({ colors: this.colorsData })
    this.formDetail.patchValue({ sizes: this.sizesData })
    console.log(this.formDetail.value);

    this.pdata = this.formDetail.value;

    this.productService.product(this.pdata).subscribe(res => {
      console.log("hello");
      console.log(res);


    }, (err: any) => {
      console.log("something went wrong");

    }
    )

  }

  ngOnInit(): void {

    this.http.category().subscribe(res => {
      console.log(res);

      this.categoryList = res.data;
      console.log(res.data[0].name);


    })
  }

}
