import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ProductServiceService } from 'src/app/services/product-service.service';

export interface arrayValue {
  [index: number]: string;
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  formDetail: FormGroup;
  stateData: any;
  stateId: string = "";
  cityData: any;
  partyData: any;
  categoryList: any;
  checkValue: String = "";
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  colorsData: arrayValue[] = [];
  sizesData: arrayValue[] = [];
  categoryValue: string = "h"

  constructor(private fb: FormBuilder, private http: HttpServiceService, private productService: ProductServiceService) {

    this.formDetail = this.fb.group(
      {
        name: ['', [Validators.required]],
        alias: ['',],
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

  ngOnInit(): void {

    this.http.category().subscribe(res => {
      this.categoryList = res.data;

    })

    this.http.getState().subscribe(res => {
      this.stateData = res.data;
    })

    this.productService.view.subscribe(res => {
      this.partyData = res
      console.log("heloI");
      
      console.log(this.partyData);


      let obj: object = {
        name: this.partyData.name,
        alias: `${this.partyData.alias}`,
        sku: `${this.partyData.sku}`,
        description: `${this.partyData.description}`,
        category: `${this.partyData.category.name}`,
        purchaseRate: `${this.partyData.purchaseRate}`,
        sellRate: `${this.partyData.sellRate}`,
        colors: `${this.partyData.colors}`,
        sizes: `${this.partyData.sizes}`,
      }

      this.categoryValue = this.partyData.category.name

      for (let i = 0; i < this.partyData.colors.length; i++) {
        this.colorsData.push(this.partyData.colors[i])
      }

      for (let i = 0; i < this.partyData.sizes.length; i++) {
        this.sizesData.push(this.partyData.sizes[i])
      }

      this.formDetail.setValue(obj)

    })


  }

  get name() {
    return this.formDetail.get('name')
  }
  get sku() {
    return this.formDetail.get('sku')
  }
  get description() {
    return this.formDetail.get('description')
  }
  get category() {
    return this.formDetail.get('category')
  }
  get purchase() {
    return this.formDetail.get('purchaseRate')
  }
  get sell() {
    return this.formDetail.get('sellRate')
  }
  get colors() {
    return this.formDetail.get('color')
  }
  get sizes() {
    return this.formDetail.get('size')
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

  remove(color: arrayValue): void {

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

  onClickSubmit() {
    this.formDetail.patchValue({ colors: this.colorsData })
    this.formDetail.patchValue({ sizes: this.sizesData })
    console.log(this.formDetail.value);

    this.productService.updateProduct(this.partyData._id, this.formDetail.value).subscribe(res => {
    })

  }

}
