import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { OrderServiceService } from 'src/app/services/order-service.service';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.scss']
})
export class VieworderComponent implements OnInit {
  orderData: any;

  constructor(private orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.orderService.view.subscribe(res => {
      this.orderData = res;

    })
  }

}
