import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { OrderServiceService } from 'src/app/services/order-service.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  buyerPartySKU: any;

  constructor(private orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.orderService.orderDetail().subscribe(res => {
      console.log(res.data.buyerPartySKU);
      this.buyerPartySKU = res.data.buyerPartySKU;
    })
  }
}
