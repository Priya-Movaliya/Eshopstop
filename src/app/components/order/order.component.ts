import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseComponent } from './purchase/purchase.component';
import { SellComponent } from './sell/sell.component';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { UpdateorderComponent } from './updateorder/updateorder.component';
import { VieworderComponent } from './vieworder/vieworder.component';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { PageEvent } from '@angular/material/paginator';
import { UpdatePurchaseComponent } from './update-purchase/update-purchase.component';
import { UpdateSellComponent } from './update-sell/update-sell.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  typeValue: string = "seller"
  partyData: any;

  length = 0;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  srNo: number = 1
  pageEvent: PageEvent | undefined;
  searchValue: string = "";
  orderData: any;



  constructor(public dialog: MatDialog, private http: HttpServiceService, private orderService: OrderServiceService) { }

  openPurchaseDialog() {
    this.dialog.open(PurchaseComponent);
  }
  openSellDialog() {
    this.dialog.open(SellComponent);
  }

  ngOnInit(): void {
    this.orderService.orderDetail().subscribe(res => {
      console.log(res);
      this.partyData = res.data.order
      this.pageSize = res.data.totalRecords;
      this.length = res.data.totalRecords;
    })
  }


  searchData(value: string) {
    this.searchValue = value;
    console.log(this.searchValue);

  }


  submit(recordSize: number | undefined, pageIndex: any) {

    this.orderService.orderTable(recordSize, pageIndex + 1, this.searchValue).subscribe(res => {
      this.partyData = res.data.order;
      this.pageSize = res.data.totalRecords;
      this.length = res.data.totalRecords;
    })

  }


  delete(id: string) {
    this.orderService.deleteOrder(id).subscribe(res => {
      console.log(res)
    })
    window.location.reload();

  }
  update(id: string) {
    // this.dialog.open(UpdateorderComponent);
    this.orderService.viewOrder(id).subscribe(res => {
      this.orderService.passOrderData(res.data)
    })

    this.orderService.view.subscribe(res => {
      this.orderData = res
      console.log(this.orderData);

      if (this.orderData.type === "seller") {
        console.log("seller");
        this.dialog.open(UpdatePurchaseComponent)

      }

      if (this.orderData.type === "buyer") {
        console.log("buyer");
        this.dialog.open(UpdateSellComponent)
      }

    })
  }

  visibility(id: string) {
    this.orderService.viewOrder(id).subscribe(res => {
      console.log(res.data);
      // this.partyData = res.data
      this.orderService.passOrderData(res.data)
    })

    this.dialog.open(VieworderComponent);
  }

}
