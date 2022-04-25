import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formDetail: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginServiceService) {

    this.formDetail = this.fb.group(
      {
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@gmail\.+[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,30}')]]
      }
    )
  }

  formValidation(data: string) {
    return this.formDetail.get(data);
  }
  submitLoginData() {
    // console.log(this.formDetail.value)
    this.loginService.login(this.formDetail.value).subscribe(res => {
      console.log('Data added successfully!')
      console.log(res);
      localStorage.setItem("secret_token", res.data.token)
      this.router.navigate(['/admin']);
    }, (err: any) => {
      console.log(err);
    })

  }

  ngOnInit(): void {
  }

}
