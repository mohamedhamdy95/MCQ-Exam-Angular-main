import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup;
  constructor(private fb:FormBuilder , private AuthService:AuthService , private router:Router ) { }

  ngOnInit(): void {
    this.creatForm()
  }
  // function to creat suer form
  creatForm(){
    this.userForm = this.fb.group({
      userName:['',[Validators.required]],
      email:['',[Validators.required , Validators.email]],
      password:['',[Validators.required]],
      rePassword:['',[Validators.required]],
    })
  }


  submit():void{
    const model ={
      username : this.userForm.value.userName,
      email : this.userForm.value.email,
      password : this.userForm.value.password,
    }
    this.AuthService.creatUser(model).subscribe({
      next:(res)=>{
        console.log(res)
        this.router.navigate(['/subjects'])
      }
    })
  }


}
