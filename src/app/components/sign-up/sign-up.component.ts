import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { RegistrationServiceService } from 'src/app/services/registration-service.service';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ThemePalette } from '@angular/material/core';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  action: string = 'X';
  formDetail: FormGroup;
  checkFocus: boolean = false;
  color: ThemePalette = 'warn'
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 0;
  weak: boolean = false
  medium: boolean = false
  strong: boolean = false

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private router: Router, private registrationService: RegistrationServiceService) {

    this.formDetail = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@gmail\.+[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,30}')]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordVerification('password', 'confirmPassword') }
    )
  }
  formValidation(data: string) {
    return this.formDetail.get(data)
  }
  passwordValue(data: string) {

    if (data.length >= 2) {
      this.value = 20;
      this.color = 'warn'
      this.weak = true
      this.medium = false;
      this.strong = false;
    }

    if (data.length >= 4 && data.match('[a-z]')) {
      this.value = 40;
      this.color = 'warn'
      this.weak = true;
      this.medium = false;
      this.strong = false;
    }

    if (data.match('[a-z]') && data.length >= 6 && data.match('[A-Z]') && data.match('[0-9]')) {
      this.value = 70;
      this.color = 'accent'
      this.medium = true;
      this.weak = false;
      this.strong = false;
    }

    if (data.match('[A-Z]') && data.match('[0-9]') && data.length >= 8 && data.match('[a-z]') && data.match('[!@#$%^&*]')) {
      this.value = 100;
      this.color = 'primary'
      this.strong = true;
      this.medium = false;
      this.weak = false;
    }
  }

  focus() {
    this.checkFocus = true;
  }
  submitSignUpData() {

    delete (this.formDetail.value.confirmPassword);
    console.log(this.formDetail);

    this.registrationService.registration(this.formDetail.value).subscribe(() => {
      console.log('Data added successfully!')
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);

    })



  }

  ngOnInit(): void {

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

}
