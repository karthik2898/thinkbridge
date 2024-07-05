import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../shared/services/apiservice.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit{
  registerForm!: FormGroup;
  toast:boolean = false;
  msg:any
  constructor(private fb: FormBuilder, private apiService: ApiserviceService){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['',[Validators.required,Validators.pattern("^[a-zA-Z0-9.-_]+@[a-zA-Z0-9-_]+[\.]{1}[a-zA-Z0-9-_]{2,4}")]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    })
  }

  register(){
    let payload = {
      "id":"",
      "email": this.registerForm.get('email')?.value,
      "password": this.registerForm.get('password')?.value
    }

    let data = JSON.stringify(payload)
    console.log(data)
    this.apiService.addUser(data).subscribe(
      (val:any)=>{
        console.log('registered successfully!')

        //call lamda to send email

        //clear form
        this.toast= true;
        this.msg = 'User Registered Successfully!'
        this.registerForm.reset();
      },
      (err:any)=>{
        console.log(err);
        this.toast= true;
        this.msg = 'Error occured while Registering, try again!'
      }
    )
  }
  
  setOpen(val:any){
    this.toast = val;
  }
}

