import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  productData: any;
  constructor(private productService: ProductServiceService) { }


  ngOnInit(): void {
    this.productService.view.subscribe(res => {
      this.productData = res

      if (this.productData.alias === null || this.productData.alias === "") {

        this.productData.alias = "---"
      }

    })
  }

}
