import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormdilogComponent } from './formdilog/formdilog.component';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { UpdateformComponent } from './updateform/updateform.component';
import { ViewformComponent } from './viewform/viewform.component';
import { Router } from '@angular/router';
import { PartyServiceService } from 'src/app/services/party-service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {

  length = 0;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  partyData: any;
  srNo: number = 1
  pageEvent: PageEvent | undefined;
  searchValue: string = "";

  constructor(public dialog: MatDialog, private http: HttpServiceService, private partyService: PartyServiceService, private router: Router) {

  }

  openDialog() {
    this.dialog.open(FormdilogComponent);
  }

  searchData(value: string) {
    this.searchValue = value;
    console.log(this.searchValue);

  }

  submit(recordSize: number | undefined, pageIndex: any) {

    this.partyService.partyTable(recordSize, pageIndex + 1, this.searchValue).subscribe(res => {
      this.partyData = res.data.vendors;
      this.pageSize = res.data.totalRecords;
    })

  }

  ngOnInit(): void {
    console.log("len");

    console.log(this.pageEvent?.length);
    this.partyService.partyTable(this.pageSize, this.pageIndex, this.searchValue).subscribe(res => {
      this.partyData = res.data.vendors;
      this.length = res.data.totalRecords;
      console.log(res);

    })

  }

  delete(id: string) {
    this.partyService.deleteParty(id).subscribe(res => {
      console.log(res)
    })
    window.location.reload();

  }
  update(id: string) {
    this.dialog.open(UpdateformComponent);
    this.partyService.viewParty(id).subscribe(res => {
      this.partyService.passPartyData(res.data)
    })
  }

  visibility(id: string) {
    this.partyService.viewParty(id).subscribe(res => {
      console.log(res.data);
      // this.partyData = res.data
      this.partyService.passPartyData(res.data)
    })

    this.dialog.open(ViewformComponent);
  }
}
