import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../shared/services/apiservice.service';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  users: any;
  constructor(private fb: FormBuilder, private apiService: ApiserviceService,private router: Router,private loaderService:LoaderService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.pattern("^[a-zA-Z0-9.-_]+@[a-zA-Z0-9-_]+[\.]{1}[a-zA-Z0-9-_]{2,4}")]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    })

    this.apiService.checkUser().subscribe(
      (val:any)=>{
        console.log(val)
        this.users= val;
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  login(){
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    this.users.forEach((element: any) => {
      if(element.email == email && element.password == password){
        sessionStorage.setItem('token','true')
        this.loaderService.isLogged.next(true)
        this.router.navigate(['/dashboard'])
      }
    })
}

}
