import { Component, OnInit } from '@angular/core';
import { CourierServiceService } from 'src/app/services/courier-service.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-viewcourier',
  templateUrl: './viewcourier.component.html',
  styleUrls: ['./viewcourier.component.scss']
})
export class ViewcourierComponent implements OnInit {
  courierData: any;

  constructor(private courierService: CourierServiceService) { }

  ngOnInit(): void {
    this.courierService.view.subscribe(res => {
      this.courierData = res
      
    })
  }
}
