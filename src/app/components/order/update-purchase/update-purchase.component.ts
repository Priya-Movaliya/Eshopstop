import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from 'src/app/services/order-service.service';

@Component({
  selector: 'app-update-purchase',
  templateUrl: './update-purchase.component.html',
  styleUrls: ['./update-purchase.component.scss']
})
export class UpdatePurchaseComponent implements OnInit {
  buyerPartySKU: any;

  constructor(private orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.orderService.orderDetail().subscribe(res => {
      console.log(res.data.buyerSKU);
      this.buyerPartySKU = res.data.partyBuyerSKU;
    })
  }

}
