import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { PartyServiceService } from 'src/app/services/party-service.service';

@Component({
  selector: 'app-viewform',
  templateUrl: './viewform.component.html',
  styleUrls: ['./viewform.component.scss']
})
export class ViewformComponent implements OnInit {
  partyData: any;
  constructor(private partyService: PartyServiceService) { }

  ngOnInit(): void {

    this.partyService.view.subscribe(res => {
      this.partyData = res

      if (this.partyData.alias || this.partyData.groupName || this.partyData.area || this.partyData.pincode === null) {

        this.partyData.alias = "---"
        this.partyData.groupName = "---"
        this.partyData.area = "---"
        this.partyData.pincode = "---"
      }
      console.log(this.partyData);


    })

  }

}


