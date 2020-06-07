import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  err = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {// redirect to home if already logged in
    // if (this.authenticationService.userValue) { 
    //     this.router.navigate(['/']);
    // } }
  }
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }



get f() { return this.loginForm.controls; }

onSubmit() {
  this.submitted = true;


  if (this.loginForm.invalid) {
      return;
  }
  
  this.loading = true;
  this.authenticationService.login( this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          err => {
              err = 'Incorrect username or password'
              this.err = err;
              this.loading = false;
          });
}
}