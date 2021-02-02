import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  showError= false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor( private route: Router) { }

  ngOnInit(): void {}

  login(){
    this.showError = false;
    if (this.loginForm.controls.username.value === 'admin' &&
      this.loginForm.controls.password.value === 'admin') {
      this.route.navigate(['dashboard/feedback']);
    } else {
      this.showError = true;
    }
  }
}
