import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartyServiceService } from 'src/app/services/party-service.service';

@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.scss']
})
export class UpdateformComponent implements OnInit {
  formDetail: FormGroup;
  stateData: any;
  stateId: string = "";
  cityData: any;
  partyData: any;

  constructor(private fb: FormBuilder, private http: HttpServiceService, private partyService: PartyServiceService) {

    this.formDetail = this.fb.group(
      {
        name: ['', [Validators.required]],
        alias: [''],
        sku: ['', [Validators.required]],
        groupName: [''],
        type: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        pancardNo: ['', [Validators.pattern('^[A-Z0-9]{10}$')]],
        adharcardNo: ['', Validators.pattern('^[0-9]{12}$')],
        gstNo: ['', [Validators.maxLength(24), Validators.minLength(24)]],
        address: ['', [Validators.required]],
        area: [''],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        pincode: [''],
      },
    )
  }

  ngOnInit(): void {
    this.http.getState().subscribe(res => {
      console.log(res);
      this.stateData = res.data;
    })

    this.partyService.view.subscribe(res => {
      this.partyData = res
      console.log(this.partyData);

        let obj: object = {
          name: `${this.partyData.name}`,
          sku: `${this.partyData.sku}`,
          alias: `${this.partyData.alias}`,
          groupName: `${this.partyData.groupName}`,
          type: `${this.partyData.type}`,
          email: `${this.partyData.email}`,
          contactNo: `${this.partyData.contactNo}`,
          adharcardNo: `${this.partyData.adharcardNo}`,
          pancardNo: `${this.partyData.pancardNo}`,
          gstNo: `${this.partyData.gstNo}`,
          address: `${this.partyData.address}`,
          area: `${this.partyData.area}`,
          state: `${this.partyData.state.name}`,
          city: `${this.partyData.city.name}`,
          pincode: `${this.partyData.pincode}`
        }

      this.formDetail.setValue(obj)

    })

  }

  get name() {
    return this.formDetail.get('name')
  }
  get sku() {
    return this.formDetail.get('sku')
  }
  get type() {
    return this.formDetail.get('type')
  }
  get email() {
    return this.formDetail.get('email')
  }
  get contact() {
    return this.formDetail.get('contactNo')
  }
  get adhar() {
    return this.formDetail.get('adharcardNo')
  }
  get pan() {
    return this.formDetail.get('pancardNo')
  }
  get gst() {
    return this.formDetail.get('gstNo')
  }
  get address() {
    return this.formDetail.get('address')
  }
  get state() {
    return this.formDetail.get('state')
  }
  get city() {
    return this.formDetail.get('city')
  }

  onClickSubmit() {

    // this.formDetail.value['_id'] = this.partyData._id
    console.log('Data ==========> ', this.formDetail.value);
    this.partyService.updateParty(this.partyData._id, this.formDetail.value).subscribe(res => {
      console.log(res);
    })

  }

  submit(data: string) {
    this.stateId = data

    this.http.getCity(this.stateId).subscribe(res => {
      this.cityData = res.data

    })
  }

}
