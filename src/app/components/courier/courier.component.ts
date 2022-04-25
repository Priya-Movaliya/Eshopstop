import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourierformComponent } from './courierform/courierform.component';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { UpdatecourierComponent } from './updatecourier/updatecourier.component';
import { ViewcourierComponent } from './viewcourier/viewcourier.component';
import { CourierServiceService } from 'src/app/services/courier-service.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {
  partyData: any;
  srNo: number = 1
  length = 0;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent | undefined;
  searchValue: string = "";


  constructor(public dialog: MatDialog, private http: HttpServiceService, private courierService: CourierServiceService) { }

  openDialog() {
    this.dialog.open(CourierformComponent);
  }

  ngOnInit(): void {
    this.courierService.courierTable(this.pageSize, this.pageIndex, this.searchValue).subscribe(res => {
      console.log(res);
      this.partyData = res.data.courier
      this.pageSize = res.data.totalRecords;
      this.length = res.data.totalRecords;

    })
  }

  searchData(value: string) {
    this.searchValue = value;
    console.log(this.searchValue);

  }

  submit(recordSize: number | undefined, pageIndex: any) {

    this.courierService.courierTable(recordSize, pageIndex + 1, this.searchValue).subscribe(res => {
      this.partyData = res.data.courier;
      this.pageSize = res.data.totalRecords;
      this.length = res.data.totalRecords;
    })

  }

  delete(id: string) {
    this.courierService.deleteCourier(id).subscribe(res => {
      console.log(res)
    })
    window.location.reload();

  }
  update(id: string) {
    this.dialog.open(UpdatecourierComponent);
    this.courierService.viewCourier(id).subscribe(res => {
      this.courierService.passCourierData(res.data)
    })
  }

  visibility(id: string) {
    this.courierService.viewCourier(id).subscribe(res => {
      console.log(res.data);
      // this.partyData = res.data
      this.courierService.passCourierData(res.data)
    })

    this.dialog.open(ViewcourierComponent);
  }

}
