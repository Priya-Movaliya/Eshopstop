import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductformComponent } from './productform/productform.component';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ViewProductComponent } from './view-product/view-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  partyData: any;
  srNo: number = 1
  length = 4;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent | undefined;
  searchValue: string = "";


  constructor(public dialog: MatDialog, private productService: ProductServiceService) { }

  openDialog() {
    this.dialog.open(ProductformComponent);
  }

  ngOnInit(): void {
    this.productService.productTable(this.pageSize, this.pageIndex, this.searchValue).subscribe(res => {
      this.partyData = res.data.products
      this.pageSize = res.data.totalRecords;
      length = res.data.totalRecords;
      console.log(res.data);

    })
  }

  submit(recordSize: number | undefined, pageIndex: any) {

    this.productService.productTable(recordSize, pageIndex + 1, this.searchValue).subscribe(res => {
      this.partyData = res.data.products;
      this.pageSize = res.data.totalRecords;
      console.log(res.data.totalRecords);

    })

  }

  delete(id: string) {
    this.productService.deleteProduct(id).subscribe(res => {
      console.log(res)
    })
    window.location.reload();

  }
  update(id: string) {
    this.dialog.open(UpdateProductComponent);
    this.productService.viewProduct(id).subscribe(res => {
      this.productService.passProductData(res.data)
    })
  }

  visibility(id: string) {
    this.productService.viewProduct(id).subscribe(res => {
      console.log(res.data);
      this.productService.passProductData(res.data)
    })
    this.dialog.open(ViewProductComponent)

  }

}
