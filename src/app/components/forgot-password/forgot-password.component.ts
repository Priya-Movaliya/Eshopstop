import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formDetail: FormGroup;
  checkFocus: boolean = false
  emailPattern: string = '^[a-z0-9._%+-]+@gmail\.+[a-z]{2,4}$'

  pswPattern: string = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,30}'

  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private router: Router) {

    this.formDetail = this.fb.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern(this.pswPattern)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordVerification('password', 'confirmPassword') }
    )
  }
  get email() {
    return this.formDetail.get('email')
  }
  get psw() {
    return this.formDetail.get('password')
  }
  get cpsw() {
    return this.formDetail.get('confirmPassword')
  }
  focus() {
    this.checkFocus = true;
  }
  submitUpdateDetail() {
    delete (this.formDetail.value.confirmPassword);
    this.loginService.forgotPassword(this.formDetail.value).subscribe(res => {
      console.log(res);

    })

    this.router.navigate(['/login']);
  }
  passwordVerification(controlPassword: string, controlConfirmPassword: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[controlPassword];
      const confirmPassword = formGroup.controls[controlConfirmPassword];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordVerification: true });
      }
    }
  }
  ngOnInit(): void {
  }


}
